import uuid
from typing import Dict, List
import json

import requests


auth = {
    app_id: "7bcdeef6-b975-4721-b962-ad34e0f33fb5",
    app_key: "c3a8ebc7-eb65-492f-b706-952a5dedae0a"
}

response = requests.get("https://api.genability.com/rest/echo/hello", auth=(auth["app_id"], auth["app_key"]))
print(response.text)


class GenabilityApiInterface:
    def __init__(self, app_id, app_key):
    self.app_id: auth["app_id"]
    self.app_key: auth["app_key"]
    self.api_base: "https://api.genability.com/rest/v1"

    CustomerClasses = {
        residential: "1",
        general: "2",
        special: "4"
    }

    Service Types = {
        electricity = "ELECTRICITY"
        solar_pv = "SOLAR_PV"
    }

    def send_api_request(self, endpoint_url, rest_verb, data: Dict = None):
        url_string: str = f"{self.api_base}/{endpoint_url}"
        auth_tuple = (self.app_id, self.app_key)
        if rest_verb == "GET":
            api_response: requests.Response = requests.get(url_string, params=data, auth=auth_tuple)
        # elif rest_verb == 'POST':
        #     api_response: requests.Response = requests.post(url_string, json=data, auth=auth_tuple)
        elif rest_verb == 'PUT':
            headers = {"Content-Type": "application/json"}
            api_response: requests.Response = requests.put(url_string, data=json.dumps(data), headers=headers, auth=auth_tuple)
        else:
            raise Exception(f"Unsupported verb {verb}")

        return api_response.json()


    """
    Step 1: Create customer account
    Step 2 (optional): Set Corrected Utility and Tariff info for Customer (GET customer account)
    Step 3: Create Customer Usage Profile
    Step 4: Create Solar Profile 
    Step 5: Calculate cost without solar and storage
    Step 6: Create Net Hourly Profile
    Step 7: Model Storage Profile - We create this
    """

    # Creates a customer building account
    def create_account(
        self,
        account_name,
        address1,
        address2,
        city,
        zip,
        country,
        customer_class: CustomerClasses.residential,
        account_uuid = str(uuid.uuid4())
        enpoint_url = f"accounts"

        api_body = {
            "providerAccountId": account_uuid,
            "accountName": account_name,
            "address": address,
            "properties": {
                "customerClass": {
                    "keyName": "customerClass",
                    "dataValue": customer_class.value
                }
            }
        }
        api_response = self.send_api_request(endpoint_url=enpoint_url, verb='put', data=api_body)

        # tariff_endpoint_url = f"accounts/pid/{account_uuid}/properties"

        # # tariff_body = {
        # #     "keyName": "masterTariffId",
        # #     "dataValue": "3251052",
        # #     "accuracy": 100
        # # }

        # tariff_response = self.send_api_request(tariff_endpoint_url, 'put', tariff_body)

        return api_response
        

API = GenabilityApiInterface(auth.app_id, auth.app_key)
API.create_account(
    account_name="My Test Account",
    address1="1222 Harrison St",
    address2="Apt 6611",
    city="San Francisco",
    zip="94103",
    country="US"

    
    
    )