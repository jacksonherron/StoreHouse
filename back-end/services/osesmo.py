import json
with open('./profiles/electricity_profile.json', 'r') as f:
    electricity_profile = json.load(f)
with open('./profiles/solar_profile.json', 'r') as f:
    solar_profile = json.load(f)

hourly_electricity_profile = []
for hour in electricity_profile["results"][0]["intervals"]["list"]:
	hourly_electricity_profile.append(hour["kWh"]["quantityAmount"])

# print(hourly_electricity_profile)
print(len(hourly_electricity_profile))

hourly_solar_profile = []
for hour in solar_profile["results"][0]["baselineMeasures"]:
    hourly_solar_profile.append(hour["v"])

# print(hourly_solar_profile)
print(len(hourly_solar_profile))