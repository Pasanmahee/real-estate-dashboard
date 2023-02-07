import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import MonitorBlockCard from './MonitorBlockCard';
import request from './../../utils/request';

export default () => {
  const [totalProperties, setTotalProperties] = useState<number>(0);
  const [totalForSale, setTotalForSale] = useState<number>(0);
  const [totalForRent, setTotalForRent] = useState<number>(0);

  useEffect(() => {
    request('/real_estate_api/properties', {
      method: 'GET',
    }).then((propertyResponse) => {
      if(propertyResponse) {
        setTotalProperties(propertyResponse?.length)

        let tempForSale = 0
        let tempForRent = 0
        propertyResponse?.map((property_data: any) => {
          if(property_data.status === "For Sale") {
            tempForSale ++
          }
          if(property_data.status === "For Rent") {
            tempForRent ++
          }
        })
        setTotalForSale(tempForSale)
        setTotalForRent(tempForRent)
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <PageContainer>
      <MonitorBlockCard
        total_properties={totalProperties}
        total_for_sale={totalForSale}
        total_for_rent={totalForRent} />
    </PageContainer>
  );
};
