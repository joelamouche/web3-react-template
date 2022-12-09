
const columnsFund = [
  {
    title: 'Fund Name',
    dataIndex: 'fundName',
    key: 'fundName',
    width: 400
  },
  {
    title: '% Performance',
    dataIndex: 'performance',
    key: 'performance',
    width: 200
  },
  {
    title: '24h Volume ($)',
    dataIndex: 'volume',
    key: 'volume',
    width: 200
  },
  {
    title: 'Status',
    dataIndex: 'fundStatus',
    key: 'fundStatus',
    width: 200,
  },
  {
    title: 'Information',
    key: 'operation',
    width: 200,
    render: () => (
      <div style= {{display: "flex",}}>
        <a href=".buyComponent" style={{marginRight: 10}}>Learn More</a>
      </div>
    ),
  },
];

export default columnsFund;