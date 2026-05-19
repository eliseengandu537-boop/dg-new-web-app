interface DataType {
   id: number;
   page: string
   question: string;
   answer: string;
   showAnswer: boolean;
}

const faq_data:DataType[] = [
   {
      id: 1,
      page: "home_2_faq_1",
      question: "Commercial leasing expertise",
      answer: "We represent retail, office and industrial properties, helping landlords and occupiers move from brief to signed lease with practical market insight.",
      showAnswer: false,
   },
   {
      id: 2,
      page: "home_2_faq_1",
      question: "Investment sales focus",
      answer: "DG Property works on investment acquisitions and disposals, including properties where discretion and qualified buyer reach matter.",
      showAnswer: false,
   },
   {
      id: 3,
      page: "home_2_faq_1",
      question: "Turnkey support",
      answer: "Clients also benefit from advisory thinking and a broader professional network that helps transactions move efficiently.",
      showAnswer: false,
   },

   // home_2_faq_2

   {
      id: 1,
      page: "home_2_faq_2",
      question: "What property types do you focus on?",
      answer: "Focused on delivering strategic commercial property solutions across leasing, sales, investments, and valuations.",
      showAnswer: false,
   },
   {
      id: 2,
      page: "home_2_faq_2",
      question: "Do you handle both leasing and sales?",
      answer: "Yes. DG Property supports leasing mandates, commercial sales, investment transactions and valuation-led decision making.",
      showAnswer: false,
   },
   {
      id: 3,
      page: "home_2_faq_2",
      question: "Are off-market properties available?",
      answer: "Where appropriate, the team works discreetly and can introduce qualified parties to properties that are not broadly marketed.",
      showAnswer: false,
   },
   {
      id: 4,
      page: "home_2_faq_2",
      question: "Where is DG Property based?",
      answer: "DG Property is based at Bedford Arcade in Bedfordview, Johannesburg, and works with clients across South Africa.",
      showAnswer: false,
   },

   // home_six
   
   {
      id: 1,
      page: "home_six",
      question: "Who we are?",
      answer: "We are a specialist property company focused on delivering tailored solutions across the commercial, industrial, and retail sectors. With a deep understanding of market dynamics and client needs, we connect businesses with spaces that support growth, efficiency, and long-term success. Our approach is built on strong relationships, strategic insight, and a commitment to delivering value at every stage of the property journey.",
      showAnswer: false,
   },
   {

      id: 3,
      page: "home_six",
      question: "Our vision",
      answer: "At DG Property, we connect entrepreneurs with spaces that move their business forward, driven by a mission of excellence and a vision to revolutionize commercial and industrial real estate in South Africa. With purpose and direction, we turn your vision into reality through high-performance service and results.",
      showAnswer: false,
   },
];

export default faq_data;
