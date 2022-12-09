import { Badge } from 'antd';
const dataFund = [
  {
    key: '1',
    fundName: 'Dowgo Alpha Fund',
    performance: "24%",
    volume: '110k',
    fundStatus:(
      <span>
        <Badge status="success" />
        Active
      </span>
    ),
  },
  {
    key: '2',
    fundName: 'Dowgo Beta Fund',
    performance: "31%",
    volume: '220k',
    fundStatus:(
      <span>
        <Badge status="processing" />
        Inactive
      </span>
    ),
  },
];

export default dataFund;