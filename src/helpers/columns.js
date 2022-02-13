
export const COLUMNS = [
    {
        Header: 'ID',
        accessor: "id",
    },
    {
        Header: 'Name',
        accessor: "name",
    },
    {
        Header: 'Score',
        accessor: "score",
    },
    {
        Header: 'Duration in days',
        accessor: "durationInDays",
    },
    {
        id: 'madeDadeline', //added 'id' because the accesor isn't type of 'string'
        Header: 'Made deadline',
        accessor: d => d.madeDadeline.toString(),
    },
    {
        Header: 'Bugs count',
        accessor: "bugsCount",
    },
]