import json
with open('./profiles/hourly_profile.json', 'r') as f:
    hourly_consumption = json.load(f)
with open('./profiles/net_hourly_profile.json', 'r') as f:
    net_hourly_profile = json.load(f)

# annual_hourly_consumption = []
# for hour in hourly_consumption["results"][0]["intervals"]["list"]:
# 	annual_hourly_consumption.append(hour["kWh"]["quantityAmount"])

print(annual_hourly_consumption)

# annual_hourly_solar = []
# for hour in net_hourly_profile["results"][0]["items"]:
#     if hour["quantityKey"] == "consumption" and 
# 	annual_hourly_solar.append(-(hour["kWh"]["quantityAmount"]-annual_hourly_consumption[i]))

# print(annual_hourly_solar)