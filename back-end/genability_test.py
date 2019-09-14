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
providerAccountId = "49546fc5-7101-42d6-8ab4-539f855b4918"
electricityProfileId = "49546fc5-7101-42d6-8ab4-539f855b4918-bills"
solarProfileId = "49546fc5-7101-42d6-8ab4-539f855b4918-pvwatts"
genabilitySolarProfileId = "5d7c8e0681618874487006f7"
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
# print(GenabilityInterface.create_electricity_profile(providerAccountId=providerAccountId, bill_1="350", bill_2="360", bill_3="380"))

# Test CREATE_SOLAR_PROFILE - PASSED
# print(GenabilityInterface.create_solar_profile(providerAccountId=providerAccountId, direction="SOUTH", system_size="3", tilt="20"))

# Test CALCULATE_BASELINE_COSTS - PASSED
print(GenabilityInterface.calculate_baseline_costs(providerAccountId=providerAccountId))

# Test RETRIEVE_NET_HOURLY_PROFILE - PASSED
# print(GenabilityInterface.retrieve_net_hourly_profile(providerAccountId=providerAccountId, solarProfileId=genabilitySolarProfileId))

# Test GET_ELECTRICITY_PROFILE
# print(GenabilityInterface.get_electricity_profile(profile_id=electricityProfileId))

# Test GET_SOLAR_PROFILE
# print(GenabilityInterface.get_solar_profile(profile_id=solarProfileId))