from services.genability import auth, GenabilityApiInterface

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
# providerAccountId = "4e6d4f43-a94f-478c-8201-12532c653b01"
# electricityProfileId = "4e6d4f43-a94f-478c-8201-12532c653b01-bills"
# solarProfileId = "5d7722728161887448ff265d"
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
# print(GenabilityInterface.retrieve_net_hourly_profile(providerAccountId=providerAccountId, solarProfileId=solarProfileId))

# Test GET_PROFILE
# print(GenabilityInterface.get_profile(profile_id=electricityProfileId))

# Test RETRIEVE_HOURLY_SOLAR
# print(GenabilityInterface.retrieve_hourly_solar(providerAccountId=providerAccountId))