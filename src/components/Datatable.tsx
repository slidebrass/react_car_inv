import { useState } from 'react';
import Modal from "./Modal";
import { server_calls } from '../api/server';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetData } from '../custom-hooks/FetchData';

const columns: GridColDef[] = [
    { field: 'id', headerName: "ID", width: 90, hide: true},
    { field: 'prod_date', headerName: 'Date of Production', flex: 1},
    { field: 'make', headerName: 'Make', flex: 1},
    { field: 'model', headerName: 'Model', flex: 1},
    { field: 'color', headerName: 'Color', flex: 1}
]

function Datatable() {
    const [ open, setOpen ] = useState(false);
    const { contactData, getData } = useGetData();
    const [ selectionModel, setSelectionModel ] = useState<string[]>([])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const deleteData = () => {
        server_calls.delete(selectionModel[0])
        getData();
        console.log(`Selection model: ${selectionModel}`)
    }

    const getData = async () => {
        const result = await server_calls.get();
        console.log(result)
    }

  return (
    <>
        <Modal
            open={open}
            onClose={handleClose}
        />
        <div className="flex flex-row">
            <div>
                <button
                    className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white"
                    onClick={() => handleOpen()}
                >
                    Create New Car Record
                </button>
            </div>
            <button className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white">Update</button>
            <button className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white">Delete</button>
        </div>
        <div className= { open ? "hidden" : "container mx-10 my-5 flex flex-col"} 
            style={{ height: 400, width: '100%'}}
        >
            <h2 className="p-3 bg-slate-300 my-2 rounded">My Cars</h2>
            <DataGrid rows={contactData} columns={columns} rowsPerPageOptions={[5]}
                    checkboxSelection={true}
                    onSelectionModelChange={ (item:any) => {
                        setSelectionModel(item)
                    }}
            />
        </div>
    </>
  )
}

export default Datatable
