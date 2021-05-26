import requests
import json
import pandas as pd
import pandas_read_xml as pdx
import xmltodict
from xml.etree import ElementTree


def call_api():
    return requests.get("http://210.99.248.79/service/RecycleDicsInfoService/getRecycleDicsInfoList/")

def download_xml():
    r = call_api()
    with open('./data.xml', 'wb') as f:
        f.write(r.content)

def output_json(filename,json_string):
    with open("../outputs/"+filename, "w", encoding='utf8') as json_file:
        json_file.write(json_string)

def main():
    download_xml()
    with open('data.xml', 'r') as myfile:
        obj = xmltodict.parse(myfile.read())
        
    json_string = json.dumps(obj,ensure_ascii=False)
    print(json_string)
    output_json("jeju_OpenAPI.json",json_string)
    

if __name__ == "__main__":
    main()