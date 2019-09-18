from services.genability import auth, GenabilityApiInterface
import json

GenabilityInterface = GenabilityApiInterface(auth["app_id"], auth["app_key"])

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
# providerAccountId = "3be8a7d1-c822-42e5-90a8-6fdcf775241c"
# electricityProfileId = "3be8a7d1-c822-42e5-90a8-6fdcf775241c-bills"
# solarProfileId = "3be8a7d1-c822-42e5-90a8-6fdcf775241c-pvwatts"
# storageProfileId = "3be8a7d1-c822-42e5-90a8-6fdcf775241c-storage"
# masterTariffId = "522"

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
# print(GenabilityInterface.create_electricity_profile(providerAccountId=providerAccountId, bill_1="350", bill_2="360", bill_3="380"))

# Test CREATE_SOLAR_PROFILE - PASSED
# print(GenabilityInterface.create_solar_profile(providerAccountId=providerAccountId, direction="SOUTH", system_size="3", tilt="20"))

# Test GET_ELECTRICITY_PROFILE
# print(GenabilityInterface.get_electricity_profile(profile_id=electricityProfileId))

# Test GET_SOLAR_PROFILE
# print(GenabilityInterface.get_solar_profile(profile_id=solarProfileId))

# Test CALCULATE_BASELINE_COSTS - PASSED
# print(GenabilityInterface.calculate_baseline_costs(providerAccountId=providerAccountId))

# Test CALCULATE_SOLAR_SAVINGS - PASSED
# print(GenabilityInterface.calculate_solar_savings(providerAccountId=providerAccountId, solarProfileId=solarProfileId))

# Test CALCULATE_SOLAR_PLUS_SAVINGS - PASSED
# print(GenabilityInterface.calculate_solar_plus_storage_savings(providerAccountId=providerAccountId, solarProfileId=solarProfileId, storageProfileId=storageProfileId))

# Test ANALYZE_SOLAR - PASSED
# response = GenabilityInterface.analyze_solar(providerAccountId=providerAccountId, masterTarrifId=masterTariffId, electricityProfileId=electricityProfileId, solarProfileId=solarProfileId)
# data = json.loads(response)
# pretty_data = json.dumps(data["results"][0]["summary"], indent=4)
# print(pretty_data)

# Test ANALYZE_SOLAR_PLUS_STORAGE - PASSED
# response = GenabilityInterface.analyze_solar_plus_storage(providerAccountId=providerAccountId, masterTarrifId=masterTariffId, electricityProfileId=electricityProfileId, solarProfileId=solarProfileId, storageProfileId=storageProfileId)
# data = json.loads(response)
# pretty_data = json.dumps(data["results"][0]["summary"], indent=4)
# print(pretty_data)