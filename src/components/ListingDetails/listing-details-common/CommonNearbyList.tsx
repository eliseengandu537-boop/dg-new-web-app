interface NearbyItem { name: string; distance: string; }

const STATIC_NEARBY: NearbyItem[] = [
   { name: "School & College", distance: "0.9km" },
   { name: "Grocery Center", distance: "0.2km" },
   { name: "Metro Station", distance: "0.7km" },
   { name: "Gym", distance: "2.3km" },
   { name: "University", distance: "2.7km" },
   { name: "Hospital", distance: "1.7km" },
   { name: "Shopping Mall", distance: "1.1km" },
   { name: "Police Station", distance: "1.2km" },
   { name: "Bus Station", distance: "1.1km" },
   { name: "Market", distance: "3.4km" },
];

interface Props { nearby?: NearbyItem[]; }

const CommonNearbyList = ({ nearby }: Props) => {
   const list = nearby && nearby.length > 0 ? nearby : STATIC_NEARBY;
   return (
      <>
         <h4 className="mb-20">What&apos;s Nearby</h4>
         <ul className="style-none d-flex flex-wrap justify-content-between nearby-list-item">
            {list.map((item, i) => (
               <li key={i}>
                  {item.name}:
                  <span className="fw-500 color-dark">{item.distance}</span>
               </li>
            ))}
         </ul>
      </>
   );
}

export default CommonNearbyList;
