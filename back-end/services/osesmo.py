def main(electricity_profile_input, solar_profile_input, customer_class_input, solar_system_kw_input, storage_power_kw_input, storage_capacity_kwh_input):
    from services.OSESMO import OSESMO_IO
    storage_profile = OSESMO_IO.main(electricity_profile_input, solar_profile_input, customer_class_input, solar_system_kw_input, storage_power_kw_input, storage_capacity_kwh_input)
    return list(storage_profile)