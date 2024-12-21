import { useEffect, useState } from "react";

import {
    regions,
    provinces,
    cities,
    barangays,
} from "select-philippines-address";

const Test = () => { 
    const [regionData, setRegionData] = useState([]);
    const [provinceData, setProvinceData] = useState([]);
    const [municipalData, setMunicipalData] = useState([]);
    const [barangayData, setBarangayData] = useState([]);

    //Fetches Region Data everytime the page is loaded/refereshed.
    useEffect(() => {
        const fetchRegion = async () => {
            try {
                const response = await regions();
                setRegionData(response);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }
        fetchRegion();
    }, []);

    //Fetches all Provinces
    useEffect(() => {
        const listAllProvince = async () => {
            const allProvinces = []
    
            for (const item of regionData) {
                try {
                    const provincesForRegion = await provinces(item.region_code);
                    allProvinces.push(...provincesForRegion);
                } catch (error) {
                    console.error(`Error fetching provinces for ${item.region_name}`, error);
                }
            }
            allProvinces.sort((a,b) => a.province_name.localeCompare(b.province_name));

            setProvinceData(allProvinces);
        };

        if (regionData.length > 0) {
            listAllProvince();
        }
    }, [regionData]); 

    //Fetches Municipality based on Province
    const listMunicipalities = (code) => {
        cities(code).then((res) => {
            setMunicipalData(res);
        });
    }

    //Fetches Barangay based on Municipality
    const listBarangays = (code) => {
        barangays(code).then((res) => {
            setBarangayData(res);
        })
    }

    return (  
        <div>
            <Province data={provinceData} selection={listMunicipalities}/>
            <Municipal data={municipalData} selection={listBarangays}/>
            <Barangay data={barangayData} />
        </div>
    );
}

const Province = ({data, selection}) => {
    return (  
        <div>
            <select name="" id=""
            onChange={(e) => selection(e.target.value)}>
                <option value="0">Select Province</option>
                {data.map((p, index) => (
                    <option 
                    key={index}
                    value={p.province_code}>{p.province_name}</option>
                ))}
            </select>
        </div>
    );
}

const Municipal = ({data, selection}) => {
    return (
        <div>
            <select name="" id=""
            onChange={(e) => selection(e.target.value)}>
                <option value="0">Select Municipality</option>
                {data.map((m, index) => (
                    <option 
                    key={index}
                    value={m.city_code}>{m.city_name}</option>
                ))}
            </select>
        </div>
    );
}

const Barangay = ({data}) => {
    return (
        <div>
            <select name="" id="">
                <option value="0">Select Barangay</option>
                {data.map((b, index) => (
                    <option 
                    key={index}
                    value={b.brgy_code}>{b.brgy_name}</option>
                ))}
            </select>
        </div>
    );
}

export default Test;