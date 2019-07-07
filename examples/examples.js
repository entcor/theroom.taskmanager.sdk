

const lineChartData = {
  charts: [
    {
      type: 'line',
      data: [[0,1],[1,2],[2,4],[3,7],[4,2]]
    }
  ]
}


const barChartData = {
  // horizontal: true,
  charts: [
    {
      type: 'area',
      data: [[0,1],[1,2],[2,4],[3,7],[4,2]]
    },
    {
      type: 'area',
      style: { color: 'blue' },
      data: [[0,7],[1,6],[2,2],[3,3],[5,1]]
    },
    {
      type: 'area',
      style: { color: 'gray' },
      data: [[0,2],[1,1],[2,4],[3,2],[5,0.34]]
    }
  ]
}

const pieChartData = {
  // horizontal: true,
  charts: [
    {
      type: 'pie',
      data: [[0,1],[1,2],[2,4],[3,7],[4,2]]
    }
  ]
}


const examples = [
`## lineChart 8-)
\`\`\`chart
${JSON.stringify(lineChartData)}
\`\`\`
`,

`## barChart 8-)
\`\`\`chart
${JSON.stringify(barChartData)}
\`\`\`
`,

`## pieChart 8-)
\`\`\`chart
${JSON.stringify(pieChartData)}
\`\`\`
`,
];

module.exports = () => {
  return examples[Math.floor(Math.random() * examples.length)];
};
