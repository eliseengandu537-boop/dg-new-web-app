interface DataType {
   id: number;
   thumb: string;
   tag: string;
   title: string;
   data_delay_time?: string;
}

const inner_agent_data: DataType[] = [
   { id: 1,  thumb: "/assets/images/agent/1.jpg",   tag: "DG Property", title: "Broker" },
   { id: 2,  thumb: "/assets/images/agent/2.jpg",   tag: "DG Property", title: "Broker", data_delay_time: "0.1s" },
   { id: 3,  thumb: "/assets/images/agent/3.jpg",   tag: "DG Property", title: "Broker", data_delay_time: "0.2s" },
   { id: 4,  thumb: "/assets/images/agent/4.jpg",   tag: "DG Property", title: "Broker", data_delay_time: "0.3s" },
   { id: 5,  thumb: "/assets/images/agent/5.jpg",   tag: "DG Property", title: "Broker" },
   { id: 6,  thumb: "/assets/images/agent/6.jpeg",  tag: "DG Property", title: "Broker", data_delay_time: "0.1s" },
   { id: 7,  thumb: "/assets/images/agent/7.jpg",   tag: "DG Property", title: "Broker", data_delay_time: "0.2s" },
   { id: 8,  thumb: "/assets/images/agent/8.jpg",   tag: "DG Property", title: "Broker", data_delay_time: "0.3s" },
   { id: 9,  thumb: "/assets/images/agent/9.jpg",   tag: "DG Property", title: "Broker" },
   { id: 10, thumb: "/assets/images/agent/10.png",  tag: "DG Property", title: "Broker", data_delay_time: "0.1s" },
   { id: 11, thumb: "/assets/images/agent/11.jpg",  tag: "DG Property", title: "Broker", data_delay_time: "0.2s" },
   { id: 12, thumb: "/assets/images/agent/12.jpg",  tag: "DG Property", title: "Broker", data_delay_time: "0.3s" },
   { id: 13, thumb: "/assets/images/agent/13.jpeg", tag: "DG Property", title: "Broker" },
   { id: 14, thumb: "/assets/images/agent/14.jpeg", tag: "DG Property", title: "Broker", data_delay_time: "0.1s" },
   { id: 15, thumb: "/assets/images/agent/15.jpg",  tag: "DG Property", title: "Broker", data_delay_time: "0.2s" },
   { id: 16, thumb: "/assets/images/agent/16.jpeg", tag: "DG Property", title: "Broker", data_delay_time: "0.3s" },
   { id: 17, thumb: "/assets/images/agent/17.jpg",  tag: "DG Property", title: "Broker" },
]

export default inner_agent_data;
