const STATIC_AMENITIES: string[] = ["A/C & Heating", "Garages", "Garden", "Disabled Access", "Swimming Pool", "Parking", "Wifi", "Pet Friendly", "Ceiling Height", "Fireplace", "Play Ground", "Elevator"];

interface Props { amenities?: string[]; }

const CommonAmenities = ({ amenities }: Props) => {
   const list = amenities && amenities.length > 0 ? amenities : STATIC_AMENITIES;
   return (
      <>
         <h4 className="mb-20">Amenities</h4>
         <ul className="style-none d-flex flex-wrap justify-content-between list-style-two">
            {list.map((item, i) => (
               <li key={i}>{item}</li>
            ))}
         </ul>
      </>
   );
}

export default CommonAmenities;
