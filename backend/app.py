from enum import unique
from fileinput import FileInput
from signal import valid_signals
from stat import FILE_ATTRIBUTE_NOT_CONTENT_INDEXED
from tkinter import S
from xml.dom.expatbuilder import FilterVisibilityController
from flask import Flask, request, render_template, session, redirect, make_response 
from flask_cors import CORS
from PIL import Image, ImageFont, ImageDraw
from dotenv import load_dotenv
import pandas as pd
import numpy as np
import random
import json
import os 
import math
import io
import base64

# https://flask.palletsprojects.com/en/2.0.x/server/
# $env:FLASK_ENV = "development" 

app = Flask(__name__)
CORS(app)

df = pd.read_csv('data3.csv').iloc[:,:-1] 
# sheet_id = "1XqOtPkiE_Q0dfGSoyxrH730RkwrTczcRbDeJJpqRByQ"
# sheet_name = "MASTER - LATEST ASSESSMENT DATA"
# g_id = "954211548"
# # url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"
# print(url)
# sheet_url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/edit#gid={g_id}"
# url_1 = sheet_url.replace('/edit#gid=', '/export?format=csv&gid=')
# df = pd.read_csv(url_1).iloc[:,:-1] 
df = df[df.Client == os.environ.get("REACT_APP_CLIENT")]
# Clean the data set to set NA values to 0 for summing values etc.,.
df = df.fillna(0)
df["Water (m3)"] = df["Water (m3)"].astype(float)
    

@app.route('/')
def hello():
    response = Flask.response()
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Content-Type"] = "application/json"
    return response

@app.route('/getProducts')
def productSelection():
    resp = df.Product.unique().tolist()
    return json.dumps(resp)



@app.route('/summary_statistics/', defaults={'cradeltoGrave':'1', 'scope': 'all', 'product': None}, methods=['GET'])
@app.route('/summary_statistics/<product>/<scope>/<cradeltoGrave>', methods=["GET"])
def getsummary(scope, product, cradeltoGrave):
    # scope = request.args['scope']
    temp = df[df.Product == product]
    if scope != 'all':
        scope_temp = temp[df.Scope == int(scope)]
    else:
        scope_temp = temp
    if cradeltoGrave == '2':
        temp = temp[temp['Cradle-to-Grave Addition'] == 0]
    summary_data = {'total_emissions': temp['Emissions (kg CO2e)'].sum().round(4),
    'total_water': temp['Water (m3)'].sum().round(4),
    'total_water_scope' : scope_temp['Water (m3)'].sum().round(4),
    'total_plastic': temp['Plastic (kg)'].sum().round(4),
    'scope_emissions': scope_temp['Emissions (kg CO2e)'].sum().round(4)}
    return json.dumps(summary_data)

@app.route('/getScopes/', defaults={'product': None, 'cradeltoGrave':'true'}, methods=['GET'])
@app.route('/getScopes/<product>/<cradeltoGrave>', methods=['GET'])
def getUniqueScopes(product, cradeltoGrave):
    temp_scopes = df[df.Product == product]
    resp = temp_scopes.Scope.unique().tolist()
    resp = [str(int(i)) for i in resp]
    return json.dumps(resp)

@app.route('/fullDataBar/', defaults={'product': None, 'cradeltoGrave': 'false'}, methods=['GET'])
@app.route('/fullDataBar/<product>/<cradeltoGrave>', methods=['GET'])
def makeBar(product, cradeltoGrave):
    if(product == 'undefined'):
       product = json.loads(productSelection())[0]
    filtered_products = df[df.Product == product]
    if cradeltoGrave == '2':
        filtered_products = filtered_products[filtered_products['Cradle-to-Grave Addition'] == 0]
    # filtered_products['Scope'].round().astype(int)
    # filtered_products.assign(Scope = filtered_products['Scope'].round(decimals = 0))
    filtered_products['Scope'] = filtered_products['Scope'].round().astype(int)
    filtered_products = filtered_products[["Product Stage", "Scope", "Impact Category", "Step", "Emissions (kg CO2e)", "Water (m3)", "Plastic (kg)"]]
    resp = pd.DataFrame.to_json(filtered_products)
    return json.dumps(resp)

@app.route('/toDict/<product>/<cradeltoGrave>', methods=["GET"])
def createDictionaryReturn(product, cradeltoGrave):
    if(product == 'undefined'):
       product = json.loads(productSelection())[0]
    filtered_products = df[df.Product == product]
    if cradeltoGrave == '2':
        filtered_products = filtered_products[filtered_products['Cradle-to-Grave Addition'] == 0]
    resp = filtered_products.to_dict('index')
    return json.dumps(resp)


@app.route('/getStageRelation/', defaults={'product': None}, methods=['GET'])
@app.route('/getStageRelation/<product>/<cradeltoGrave>', methods=['GET'])
def createStageRelation(product, cradeltoGrave):
    if(product == 'undefined'):
       product = json.loads(productSelection())[0]
    filtered_products = df[df.Product == product]
    if cradeltoGrave == '2':
        filtered_products = filtered_products[filtered_products['Cradle-to-Grave Addition'] == 0]
    filtered_products = filtered_products[filtered_products["Emissions (kg CO2e)"] > 0]
    labels = np.concatenate((["Total"], filtered_products['Step'],  filtered_products['Product Stage'].unique()))
    parents = np.concatenate(([""], filtered_products['Product Stage'], np.repeat(["Total"], len(filtered_products["Product Stage"].unique()))))
    temp = filtered_products.groupby('Product Stage', as_index=True, sort=False).agg({"Emissions (kg CO2e)": "sum"})
    print( temp)
    values = np.concatenate(([filtered_products["Emissions (kg CO2e)"].sum()], filtered_products["Emissions (kg CO2e)"], temp['Emissions (kg CO2e)']))
    map_data = {"labels": labels.tolist(), "parents": parents.tolist(), "values": values.tolist()}
    return json.dumps(map_data)

@app.route('/getStageRelationWater/', defaults={'product': None}, methods=['GET'])
@app.route('/getStageRelationWater/<product>/<cradeltoGrave>', methods=['GET'])
def createStageRelationWater(product, cradeltoGrave):
    if(product == 'undefined'):
       product = json.loads(productSelection())[0]
    filtered_products = df[df.Product == product]
    if cradeltoGrave == '2':
        filtered_products = filtered_products[filtered_products['Cradle-to-Grave Addition'] == 0]
    filtered_products = filtered_products[filtered_products["Water (m3)"] > 0.0]
    labels = np.concatenate((["Total"], filtered_products['Step'],  filtered_products['Product Stage'].unique()))
    parents = np.concatenate(([""], filtered_products['Product Stage'], np.repeat(["Total"], len(filtered_products["Product Stage"].unique()))))
    temp = filtered_products.groupby('Product Stage', as_index=True, sort=False).agg({"Water (m3)": "sum"})
    values = np.concatenate(([filtered_products["Water (m3)"].sum()], filtered_products["Water (m3)"], temp['Water (m3)']))
    map_data = {"labels": labels.tolist(), "parents": parents.tolist(), "values": values.tolist()}
    return json.dumps(map_data)

@app.route('/getStageRelationPlastic/', defaults={'product': None}, methods=['GET'])
@app.route('/getStageRelationPlastic/<product>/<cradeltoGrave>', methods=['GET'])
def createStageRelationPlastic(product, cradeltoGrave):
    if(product == 'undefined'):
       product = json.loads(productSelection())[0]
    filtered_products = df[df.Product == product]
    if cradeltoGrave == '2':
        filtered_products = filtered_products[filtered_products['Cradle-to-Grave Addition'] == 0]
    labels = np.concatenate((["Total"], filtered_products['Step'],  filtered_products['Product Stage'].unique()))
    parents = np.concatenate(([""], filtered_products['Product Stage'], np.repeat(["Total"], len(filtered_products["Product Stage"].unique()))))
    temp = filtered_products.groupby('Product Stage', as_index=True, sort=False).agg({"Plastic (kg)": "sum"})
    values = np.concatenate(([filtered_products["Plastic (kg)"].sum()], filtered_products["Plastic (kg)"], temp['Plastic (kg)']))
    map_data = {"labels": labels.tolist(), "parents": parents.tolist(), "values": values.tolist()}
    return json.dumps(map_data)


@app.route('/getImpactRelation/<product>/<cradeltoGrave>', methods=["GET"])
def createImpactRelation(product, cradeltoGrave):
    if(product == 'undefined'):
       product = json.loads(productSelection())[0]
    filtered_products = df[df.Product == product]
    if cradeltoGrave == '2':
        filtered_products = filtered_products[filtered_products['Cradle-to-Grave Addition'] == 0]
    filtered_products = filtered_products[filtered_products["Emissions (kg CO2e)"] > 0]
    labels = np.concatenate((["Total"], filtered_products['Step'],  filtered_products['Impact Category'].unique()))
    parents = np.concatenate(([""], filtered_products['Impact Category'], np.repeat(["Total"], len(filtered_products["Impact Category"].unique()))))
    temp = filtered_products.groupby('Impact Category', as_index=True, sort=False).agg({"Emissions (kg CO2e)": "sum"})
    values = np.concatenate(([filtered_products["Emissions (kg CO2e)"].sum()], filtered_products["Emissions (kg CO2e)"], temp['Emissions (kg CO2e)']))
    map_data = {"labels": labels.tolist(), "parents": parents.tolist(), "values": values.tolist()}
    return json.dumps(map_data)


@app.route('/getSankeyFormat/<product>/<cradeltoGrave>', methods=["GET"])
def createSankeyData(product, cradeltoGrave):
    if(product == 'undefined'):
       product = json.loads(productSelection())[0]
    filtered_products = df[df.Product == product]
    # filtered_products = df[df.]
    filtered_products['row_num'] = np.arange(len(filtered_products)) + 2 
    filtered_products['n_count'] = filtered_products.groupby(['Scope']).cumcount() ; filtered_products
    filtered_products['TargetVal'] = filtered_products['Scope'].astype(int) - 2
    
    # test = len(filtered_products['Product Stage'].unique())
    codes, uniques = pd.factorize(filtered_products['Product Stage'])
    filtered_products['StageInt'] = np.where(filtered_products['Product Stage'] == unique)
    filtered_products['StageInt'] = codes + 2
    # filtered_products['StageInt'] = filtered_products.sort_index(ascending=True).groupby(['Product Stage']).transform('ngroup') + 2
    source = np.concatenate((filtered_products['TargetVal'].unique().tolist(), filtered_products['TargetVal']))
    target = np.concatenate(([-1], [-1], filtered_products['n_count']))
    value = np.repeat([1], len(filtered_products['TargetVal']) + len(filtered_products['TargetVal'].unique()))
    label = np.concatenate((filtered_products['Scope'].unique().tolist(), filtered_products['Product Stage']))
    map_data = {"source": source.tolist(), "target": target.tolist(), "value": value.tolist(),
    "label": label.tolist(), "stage": filtered_products['StageInt'].tolist()}
    # print(filtered_products[['Scope', 'Product Stage', 'StageInt', 'TargetVal', 'Step']])
    return "hello"

@app.route('/renderLabel/<product>', methods=["GET"])
def downloadImage(product):
    if(product == 'undefined'):
       product = json.loads(productSelection())[0]
    arrAns = downloadImageSet(product)
    # img = Image.open("./footprint1.png")
    # draw = ImageDraw.Draw(img)
    # font = ImageFont.truetype("arial.ttf", 80, encoding="unic")
    # emissions_val = json.loads(getsummary('all', product, '1')).get('total_emissions')
    # draw.text((10, 10),str(emissions_val),font=font, fill="#fff")
    # data = io.BytesIO()
    # img.save(data, "png")
    # encoded_img_data = base64.b64encode(data.getvalue())
    # temp = encoded_img_data.decode() # not just image
    return json.dumps(arrAns)
def downloadImageSet(product):
    strings = {}
    for i in [1, 2, 3, 4]: 
        name = "./footprint" + str(i) + ".png"
        img = Image.open(name)
        draw = ImageDraw.Draw(img)
        font = ImageFont.truetype("PPNeueMachina-Light.ttf", 85, encoding="unic")
        emissions_val = json.loads(getsummary('all', product, '1')).get('total_emissions')
        if(i%2==0):
            draw.text((10, 10),str(emissions_val),font=font, fill="#000")
        if(i%2==1):
            draw.text((10, 10),str(emissions_val),font=font, fill="#fff")
        data = io.BytesIO()
        img.save(data, "png")
        encoded_img_data = base64.b64encode(data.getvalue())
        temp = encoded_img_data.decode() # not just image
        strings[i] = temp
    return strings