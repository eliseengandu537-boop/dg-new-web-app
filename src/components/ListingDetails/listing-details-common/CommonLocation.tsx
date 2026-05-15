interface Props {
   address?: string;
   suburb?: string;
   city?: string;
   province?: string;
   gpsLat?: number;
   gpsLng?: number;
}

const buildMapSrc = ({ address, suburb, city, province, gpsLat, gpsLng }: Props) => {
   if (gpsLat && gpsLng) {
      return `https://maps.google.com/maps?width=600&height=450&hl=en&q=${gpsLat},${gpsLng}&t=&z=15&ie=UTF8&iwloc=B&output=embed`;
   }
   const q = [address, suburb, city, province, "South Africa"].filter(Boolean).join(", ");
   if (!q || q === "South Africa") return null;
   return `https://maps.google.com/maps?width=600&height=450&hl=en&q=${encodeURIComponent(q)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
};

const STATIC_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83088.3595592641!2d-105.54557276330914!3d39.29302101722867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874014749b1856b7%3A0xc75483314990a7ff!2sColorado%2C%20USA!5e0!3m2!1sen!2sbd!4v1699764452737!5m2!1sen!2sbd";

const CommonLocation = (props: Props) => {
   const src = buildMapSrc(props) || STATIC_SRC;
   return (
      <>
         <h4 className="mb-40">Location</h4>
         <div className="bg-white shadow4 border-20 p-30">
            <div className="map-banner overflow-hidden border-15">
               <div className="gmap_canvas h-100 w-100">
                  <iframe
                     src={src}
                     width="600" height="450" style={{ border: 0 }} allowFullScreen={true} loading="lazy"
                     referrerPolicy="no-referrer-when-downgrade" className="w-100 h-100">
                  </iframe>
               </div>
            </div>
         </div>
      </>
   );
}

export default CommonLocation;
