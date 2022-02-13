import React, { useMemo, useEffect, useState } from "react";
import { useFilters, useTable, useSortBy } from 'react-table'
//json file contains the content data
import "./table.css"
import { COLUMNS } from "../helpers/columns";

export const BasicTable = () => {
    const [projects, setProjects] = useState([])
    const [filterInput, setFilterInput] = useState("");


    //fetching the project data from API using GET request
    const getProjects = async () => {
        await fetch(`https://private-052d6-testapi4528.apiary-mock.com/info`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                //console.log(res.body);
                res.json().then(async (data) => {
                    //console.log("this is the fetched data : ", data)    //I use this console log to check the result data
                    setProjects(data)
                });
            } else res.text().then((data) => alert(data));
        });
    }


    // only once when render
    useEffect(() => {
        //console.log("Before Inital Fetch : ", projects);
        getProjects();
        //console.log("After Inital Fetch : ", projects);
    }, []);

    const rowColor = (score) => {
        //console.log("inside rowcolor : ", score); //to check the funct value
        if (score > 90) {
            return 'over90';
        } if (score < 70) {
            return 'under70';
        } else {
            return 'regular';
        }
    }


    //useMemo ensures that the data is not recreated on every render..
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => projects, [projects])
    //console.log('data : ', data);
    const tableInstance = useTable({ columns, data }, useFilters, useSortBy)// Adding the useFilters and useSortBy to filter and sort the table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter // The useFilter Hook provides a way to set the filter
    } = tableInstance

    // Update the state when input changes
    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter("name", value); // Update the name filter. Now our table will filter and show only the rows which have a matching value
        setFilterInput(value);
    };

    return (<div>
        <input className="searchInput"
            value={filterInput}
            onChange={handleFilterChange}
            placeholder={"Search name"}
        />
        <table /*getTrProps={getTrProps}*/
            {...getTableProps()}>
            <thead>
                {//Loop over the header rows
                    headerGroups.map((headrGroup) => (
                        // Apply the header row props
                        <tr {...headrGroup.getHeaderGroupProps()}>
                            {// Loop over the headers in each row
                                headrGroup.headers.map((column) => (
                                    // Apply the header cell props
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className={
                                            column.isSorted
                                                ? column.isSortedDesc
                                                    ? "sort-desc"
                                                    : "sort-asc"
                                                : ""} >
                                        {// Render the header
                                            column.render('Header')
                                        }
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }

            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                    rows.map(row => {
                        //console.log("row : ", row);
                        // Prepare the row for display
                        prepareRow(row)
                        return (
                            // Apply the row props
                            <tr className={rowColor(row.values.score)} id={row.id} {...row.getRowProps()}>
                                {// Loop over the rows cells
                                    row.cells.map(cell =>
                                    (
                                        // Apply the cell props
                                        <td {...cell.getCellProps()}>
                                            {// Render the cell contents
                                                cell.render('Cell')
                                            }
                                        </td>
                                    )
                                    )
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>

    </div >
    )
}
