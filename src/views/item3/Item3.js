import React, { useEffect, useState } from 'react';
import ReactTable from "react-table-6";
import FormUser from '../../components/FormUser';

function Item3() {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await fetch('https://enigmatic-dawn-92117.herokuapp.com/api/menuid?id=3')
        let data = await res.json()
        setPersons(data.humans)
      } catch (error) {
        throw error
      }
    }
    fetchData();
  }, [])

  async function submitPerson(values) {
    var res = values.email.split("@")
    values.nickname = res[0]

    try {
      let config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }
      let res = await fetch('https://enigmatic-dawn-92117.herokuapp.com/api/menu/human', config)
      let data = await res.json()
      console.log(data)
    } catch (error) {
      throw error
    }
  }

  const columns = [{
    Header: 'Nombre',
    accessor: 'name',
  }, {
    Header: 'Nickname',
    accessor: 'nickname',
  }, {
    Header: 'Email',
    accessor: 'email',
  }, {
    Header: 'Teléfono',
    accessor: 'phone',
  }, {
    Header: 'Edad',
    accessor: 'age',
  }]

  return (
    <section className="container">
      <div className="midth-cont">
        <div className="form-item">
          <FormUser onSubmit={submitPerson} />
        </div>
        <div className="table-item">
          <ReactTable
            data={persons}
            defaultPageSize={5}
            showPagination={persons > 5 ? true : false}
            columns={columns}
            minRows={1}
            ofText="de"
            pageText="Páginas"
            previousText='Anterior'
            nextText='Siguiente'
            sortable={false}
            showPageSizeOptions={false}
            rowsText="Filas"
            noDataText='No existen datos...'
            resizable={false}
          />
        </div>
      </div>
    </section>
  );
}

export default Item3;