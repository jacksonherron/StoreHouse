import uuid
from typing import Dict, List
import json

import requests


auth = {
    "app_id": "7bcdeef6-b975-4721-b962-ad34e0f33fb5",
    "app_key": "c3a8ebc7-eb65-492f-b706-952a5dedae0a"
}

# response = requests.get("https://api.genability.com/rest/echo/hello", auth=(auth["app_id"], auth["app_key"]))
# print(response.text)


class GenabilityApiInterface():
    def __init__(self, app_id, app_key):
        self.app_id = app_id
        self.app_key = app_key
        self.CustomerClasses = {
            "residential": "1",
            "commercial": "2",
        }

    # Template API Request
    def send_api_request(self, endpoint_url, rest_verb, data: Dict = None):
        url_string = f"https://api.genability.com/rest/{endpoint_url}"
        auth_tuple = (self.app_id, self.app_key)
        if rest_verb == "GET":
            api_response: requests.Response = requests.get(url_string, params=data, auth=auth_tuple)
        elif rest_verb == 'PUT':
            headers = {"Content-Type": "application/json"}
            api_response: requests.Response = requests.put(url_string, data=json.dumps(data), headers=headers, auth=auth_tuple)
        elif rest_verb == 'POST':
            headers = {"Content-Type": "application/json"}
            api_response: requests.Response = requests.post(url_string, data=json.dumps(data), headers=headers, auth=auth_tuple)
        elif rest_verb == 'DELETE':
            api_response: requests.Response = requests.delete(url_string, auth=auth_tuple)
        else:
            raise Exception(f"Unsupported verb {verb}")

        return api_response.json()
        # return json.dumps(api_response.json(), indent=4)


    # Creates a customer property account in Genability database
    def create_account(
            self,
            account_name,
            address1,
            address2,
            city,
            zipcode,
            country="US",
            customer_class = "residential",
        ):

        account_uuid = str(uuid.uuid4())
        endpoint_url = f"v1/accounts"
        customerClass = self.CustomerClasses[customer_class]

        api_body = {
            "providerAccountId": account_uuid,
            "accountName": account_name,
            "address": {
                "address1": address1,
                "address2": address2,
                "city": city,
                "zip": zipcode,
                "country": country,
            },

            "properties":{
                "customerClass":{
                    "keyName":"customerClass",
                    "dataType": "CHOICE",
                    "dataValue": customerClass
                }
            }
        }

        api_response = self.send_api_request(endpoint_url=endpoint_url, rest_verb='PUT', data=api_body)
        return json.dumps(api_response, indent=4)


    # Retrieves the account with providerAccoutnId from the Genability Database
    def get_account(self, providerAccountId):
        api_response = self.send_api_request(endpoint_url=f'v1/accounts/pid/{providerAccountId}', rest_verb='GET')
        return json.dumps(api_response, indent=4)


    # Retrieves utilities connected to the associated zipcode
    def get_utilities(self, zipcode):
        utility_endpoint_url = f'/public/lses?postCode={zipcode}&country=US&residentialServiceTypes=ELECTRICITY&sortOn=totalCustomers&sortOrder=DESC'

        api_response = self.send_api_request(endpoint_url=utility_endpoint_url, rest_verb='GET')
        return json.dumps(api_response, indent=4)


    # Sets the customers account utility with 100% accuracy
    def set_utility(self, providerAccountId, lseId):
        endpoint_url = f'/v1/accounts/pid/{providerAccountId}/properties'
        api_body = {
            "keyName": "lseId",
            "dataValue": lseId,
            "accuracy": 100
        }

        api_response = self.send_api_request(endpoint_url=endpoint_url, rest_verb="PUT", data=api_body)
        return json.dumps(api_response, indent=4)


    # Retrieves tariffs connected to the customer's account
    def get_tariffs(self, providerAccountId):
        endpoint_url=f'/v1/accounts/pid/{providerAccountId}/tariffs?serviceTypes=ELECTRICITY'
        api_response = self.send_api_request(endpoint_url=endpoint_url, rest_verb="GET")
        count = api_response["count"]
        options = api_response["results"]
        if count == 1:
            return json.dumps(options, indent=4)
        elif count == 2:
            return json.dumps(options[0:2], indent=4)
        elif count > 2:
            return json.dumps(options[0:3], indent=4)
        else:
            return {"status": "400", "message": "Something went wrong, please try again."}

    # Sets the customers account tariff with 100% accuracy
    def set_tariff(self, providerAccountId, masterTariffId):
        endpoint_url = f'/v1/accounts/pid/{providerAccountId}/properties'
        api_body = {
            "keyName": "masterTariffId",
            "dataValue": masterTariffId,
            "accuracy": 100
        }

        api_response = self.send_api_request(endpoint_url=endpoint_url, rest_verb="PUT", data=api_body)
        return json.dumps(api_response, indent=4)

    # Sets the customers account utility with 100% accuracy
    def update_account(self, providerAccountId, keyName, dataValue):
        endpoint_url = f'/v1/accounts/pid/{providerAccountId}/properties'
        api_body = {
            "keyName": keyName,
            "dataValue": dataValue,
        }

        api_response = self.send_api_request(endpoint_url=endpoint_url, rest_verb="PUT", data=api_body)
        return json.dumps(api_response, indent=4)
        

    # Deletes the customers account from genability database. Note this requires Genability's account, instead of the providerAccountId
    def delete_account(self, accountId):
        endpoint_url = f'/v1/accounts/{accountId}'
        api_response = self.send_api_request(endpoint_url=endpoint_url, rest_verb="DELETE")
        return json.dumps(api_response, indent=4)

    # Creates a custom electricity profile from their last three bill statements. Note bills are provided as the number kWh of electricity used (as a string)
    def create_electricity_profile(self, providerAccountId, bill_1: str, bill_2: str, bill_3: str):
        endpoint_url = f'/v1/profiles'
        api_body = { 
            "providerAccountId" : providerAccountId,
            "providerProfileId" : f'{providerAccountId}-bills',
            "profileName" : "Electricity Bills",
            "description" : "3 Past Electricity Bills provided by property owner",
            "isDefault" : True,
            "serviceTypes" : "ELECTRICITY",
            "sourceId" : "ReadingEntry",
            "readingData" : [ 
                { "fromDateTime" : "2019-06-01",
                    "toDateTime" : "2019-07-01",
                    "quantityUnit" : "kWh",
                    "quantityValue" : bill_1
                },
                { "fromDateTime" : "2019-07-01",
                    "toDateTime" : "2019-08-01",
                    "quantityUnit" : "kWh",
                    "quantityValue" : bill_2
                },
                { "fromDateTime" : "2019-08-01",
                    "toDateTime" : "2019-09-01",
                    "quantityUnit" : "kWh",
                    "quantityValue" : bill_3
                }
            ]
        }
        api_response = self.send_api_request(endpoint_url=endpoint_url, rest_verb="PUT", data=api_body)
        return json.dumps(api_response, indent=4)


     # Creates a solar energy production profile given input data. Direction is either EAST, SOUTH, or WEST. Size is the kW capacity of the system, represented as a string.
    def create_solar_profile(self, providerAccountId, direction: str, system_size: str):
        endpoint_url = f'/v1/profiles'
        azimuthConversion = {
            "EAST": "90",
            "SOUTH": "180",
            "WEST": "270"
        }
        azimuth = azimuthConversion[direction]
        api_body = {
            "providerAccountId" : providerAccountId,
            "providerProfileId" : f'{providerAccountId}-pvwatts',
            "groupBy" : "HOUR",
            "serviceTypes" : "SOLAR_PV",
            "source": {
                "sourceId":"PVWatts",
                "sourceVersion": "5"
            },
            "properties" : {
                "systemSize" : {
                "keyName" : "systemSize",
                "dataValue" : system_size
                },
                "azimuth" : {
                "keyName" : "azimuth",
                "dataValue" : azimuth
                },
                "losses" : {
                "keyName" : "losses",
                "dataValue" : "15"
                },
                "inverterEfficiency" : {
                "keyName" : "inverterEfficiency",
                "dataValue" : "96"
                },
                "tilt" : {
                "keyName" : "tilt",
                "dataValue" : "20"
                }
            }
        }
        api_response = self.send_api_request(endpoint_url=endpoint_url, rest_verb="PUT", data=api_body)
        return json.dumps(api_response, indent=4)


    # Calculates baseline annual cost of electricity without solar or storage
    def calculate_baseline_costs(self, providerAccountId):
        endpoint_url = f'/v1/accounts/pid/{providerAccountId}/calculate/'
        api_body = { 
            "fromDateTime": "2019-09-01T00:00:00", 
            "toDateTime": "2020-09-31T00:00:00", 
            "useIntelligentBaselining": "true", 
            "includeDefaultProfile": "true",
            "autoBaseline": "true", 
            "minimums": "false", 
            "detailLevel": "CHARGE_TYPE", 
            "groupBy": "Hour", 
            "fields": "EXT"
        }
        api_response = self.send_api_request(endpoint_url=endpoint_url, rest_verb="POST", data=api_body)
        return json.dumps(api_response, indent=4)


    # Retrieves the net hourly profile of electricity consumption minus production from solar, and calculates yearly savings
    def retrieve_net_hourly_profile(self, providerAccountId, solarProfileId):
        endpoint_url = f'/v1/accounts/pid/{providerAccountId}/calculate/'
        api_body = {       
            "fromDateTime": "2019-09-01T00:00:00", 
            "toDateTime": "2020-08-31T00:00:00", 
            "useIntelligentBaselining": "true", 
            "includeDefaultProfile": "true",
            "autoBaseline": "true", 
            "minimums": "false", 
            "detailLevel": "CHARGE_TYPE_AND_TOU", 
            "groupBy": "HOUR", 
            "fields": "EXT",
            "tariffInputs": [{
                "keyName": "profileId",
                "dataValue": solarProfileId,
                "operator": "-"
            }]
        }
        api_response = self.send_api_request(endpoint_url=endpoint_url, rest_verb="POST", data=api_body)
        return json.dumps(api_response, indent=4)


    # Retrieves hourly electricity consumption/production from a previously create profile 
    def get_profile(self, profile_id):
        endpoint_url = f"profiles/pid/{profile_id}/?populateIntervals=true&groupBy=HOUR"
        api_body = {
            "fromDateTime": "2019-09-01T00:00:00", 
            "toDateTime": "2020-08-31T00:00:00", 
            "useIntelligentBaselining": "true",
            "populateReadings": "true",
            "autoBaseline": "true",
            "detailLevel": "CHARGE_TYPE_AND_TOU",
            "fields": "EXT",
        }
        api_response = self.send_api_request(endpoint_url, 'GET', api_body)
        return json.dumps(api_response, indent=4)

######### TESTING ########

GenabilityInterface = GenabilityApiInterface(app_id=auth["app_id"], app_key=auth["app_key"])

# # TEST CREATE_ACCOUNT PASSED
# print(GenabilityInterface.create_account(
#         account_name="Commercial account",
#         address1="1222 Harrison St",
#         address2="Apt 6611",
#         city="San Francisco",
#         zipcode="94103",
#         country="US",
#         customer_class="commercial"
#     ))

# Residential Account
providerAccountId = "4e6d4f43-a94f-478c-8201-12532c653b01"
electricityProfileId = "4e6d4f43-a94f-478c-8201-12532c653b01-bills"
solarProfileId = "5d7722728161887448ff265d"
# Commercial Account 
# providerAccountId = "3204f99c-a8e7-49b9-9658-9fcdd22d0893"

# TEST GET_ACCOUNT - PASSED
# print(GenabilityInterface.get_account(providerAccountId=providerAccountId))

# TEST GET_UTILITIES - PASSED
# print(GenabilityInterface.get_utilities(zipcode="94103"))

# TEST SET_UTILITY - PASSED
# print(GenabilityInterface.set_utility(providerAccountId=providerAccountId, lseId=734))

# TEST GET_TARIFFS - PASSED
# print(GenabilityInterface.get_tariffs(providerAccountId=providerAccountId))

# TEST SET_TARIFF - PASSED
# print(GenabilityInterface.set_tariff(providerAccountId=providerAccountId, masterTariffId=82009))

# TEST UPDATE_ACCOUNT - PASSED
# print(GenabilityInterface.update_account(providerAccountId, keyName="customerClass", dataValue="1"))

#  TEST DELETE_ACCOUNT - PASSED
# print(GenabilityInterface.delete_account(accountId))

# TEST CREATE_ELECTRICITY_PROFILE - PASSED
# print(GenabilityInterface.create_electricity_profile(providerAccountId=providerAccountId, bill_1="810", bill_2="900", bill_3="780"))

# Test CREATE_SOLAR_PROFILE - PASSED
# print(GenabilityInterface.create_solar_profile(providerAccountId=providerAccountId, direction="SOUTH", system_size="3"))

# Test CALCULATE_BASELINE_COSTS - PASSED
# print(GenabilityInterface.calculate_baseline_costs(providerAccountId=providerAccountId))

# Test RETRIEVE_NET_HOURLY_PROFILE - PASSED
print(GenabilityInterface.retrieve_net_hourly_profile(providerAccountId=providerAccountId, solarProfileId=solarProfileId))

# Test GET_PROFILE
# print(GenabilityInterface.get_profile(profile_id=electricityProfileId))

# Test RETRIEVE_HOURLY_SOLAR
# print(GenabilityInterface.retrieve_hourly_solar(providerAccountId=providerAccountId))