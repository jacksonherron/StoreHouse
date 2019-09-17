def Import_Retail_Rate_Data(Input_Output_Data_Directory_Location, OSESMO_Git_Repo_Directory, delta_t, Retail_Rate_Name_Input):
 
    # Load Python Packages
    import os
    import numpy as np

    # Demand Charges - PG&E E-TOU-B
    Summer_Peak_DC = 0
    Summer_Part_Peak_DC = 0
    Summer_Noncoincident_DC = 0
    Winter_Peak_DC = 0
    Winter_Part_Peak_DC = 0 # There is no part-peak demand charge in the winter.
    Winter_Noncoincident_DC = 0

    # Fixed Per-Meter-Day Charge - PG&E E-TOU-B
    Fixed_Per_Meter_Day_Charge = 0 # $ per meter per day
    Fixed_Per_Meter_Month_Charge = 0 # $ per meter per month

    # Summer Months
    First_Summer_Month = 6 # June is the first summer month for this rate.
    Last_Summer_Month = 9 # September is the last summer month for this rate.


    Retail_Rate_Master_Index = "1"
    Retail_Rate_Effective_Date = "January 1st, 2017"
    Volumetric_Rate_Data = np.genfromtxt('services/OSESMO/2017_PGE_ETOUB_Energy_Rates_Vector.csv', delimiter=',')
    Month_Data = np.genfromtxt('services/OSESMO/Month_Vector.csv', delimiter=',')
    Summer_Peak_Binary_Data = np.zeros(np.shape(Month_Data))
    Summer_Part_Peak_Binary_Data = np.zeros(np.shape(Month_Data))
    Winter_Peak_Binary_Data = np.zeros(np.shape(Month_Data))
    Winter_Part_Peak_Binary_Data = np.zeros(np.shape(Month_Data))


    return Retail_Rate_Master_Index, Retail_Rate_Effective_Date, Volumetric_Rate_Data, Summer_Peak_DC, Summer_Part_Peak_DC, Summer_Noncoincident_DC, \
           Winter_Peak_DC, Winter_Part_Peak_DC, Winter_Noncoincident_DC, Fixed_Per_Meter_Day_Charge, Fixed_Per_Meter_Month_Charge, \
           First_Summer_Month, Last_Summer_Month, Month_Data,\
           Summer_Peak_Binary_Data, Summer_Part_Peak_Binary_Data, Winter_Peak_Binary_Data, Winter_Part_Peak_Binary_Data