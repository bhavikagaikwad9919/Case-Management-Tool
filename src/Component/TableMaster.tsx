import React, { useState, useEffect } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Selection,
  Inject,
  Toolbar,
  Page,
  Filter,
  Sort,
  Edit,
  PdfExport,
  ExcelExport,
  ColumnChooser,
  ForeignKey,
  Resize,
  DetailRow
} from '@syncfusion/ej2-react-grids';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2/data';
import { useParams } from 'react-router-dom';
function TableMaster() {

    const toolBarOptions = [
        "Add",
        "Edit",
        "Delete",
        "Update",
        "Cancel",
        "ExcelExport",
        "ColumnChooser",
        "Search"
    ];

    const toolbarClick = (args: any) => {
        if (gridInstance) {
            if (args.item.id.includes('excelexport')) {
                gridInstance.excelExport({
                    fileName: 'demoData.xlsx'
                });
            }
        }
    }

    const pageOptions = {
        currentPage: 1,
        pageSize: 25,
        pageCount: 20,
        pageSizes: ["25", "50", "100", "All"],
    };

    const filterOptions: any = {
        type: "Menu",
    };

    let gridInstance: any;

    
  const user: any = localStorage.getItem("user");
  const token = JSON.parse(user)?.accessToken;
  const params: any = useParams();
  const id: any = params.id;

  const formatAmPm = { type: 'dateTime', format: 'M/d/y hh:mm a' };

  const [dataFromApi, setDataFromApi] = useState([]);
  const [dataFromCounselAddressApi, setDataFromCounselAddressApi] = useState([]);
  const [dataFromCounselAttorneyApi, setDataFromCounselAttorneyApi] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/Counsel?$expand=CounselAddresses,CounselAttorneys`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setDataFromApi(data.value);
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/CounselAttorney`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setDataFromCounselAttorneyApi(data.value);
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/Counseladdress`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setDataFromCounselAddressApi(data.value);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

  const rowSelected = (args:any) => {
    const selRecord = args.data;
    let selecteMessage = document.getElementsByClassName('e-statustext')[0];
    let message = selecteMessage.querySelector('b');
    if (message) {
      message.textContent = selRecord.CounselLawFirm;
    } else {
      // Handle the case when 'message' is null or no matching element was found
    }

    const filteredCounselAddressData = selRecord.CounselAddresses || []; 
    setDataFromCounselAddressApi(filteredCounselAddressData);
    const filteredCounselAttorneyData = selRecord.CounselAttorneys || []; 
    setDataFromCounselAttorneyApi(filteredCounselAttorneyData);
    setDataFromCounselAttorneyApi(filteredCounselAttorneyData);
  };
  return (
    <div className="control-pane">
      <div className="control-section">

        <GridComponent
          dataSource={dataFromApi}
          ref={(grid) => (gridInstance = grid)}
          selectedRowIndex={2}
          rowSelected={rowSelected}
          allowPaging={true}
                    pageSettings={pageOptions}
                    allowFiltering={true}
                    allowSorting={true}
                    allowResizing={true}
                    editSettings={{
                        allowEditing: true,
                        allowAdding: true,
                        allowDeleting: true,
                    }}
                    showColumnChooser={true}
                    toolbar={toolBarOptions}
                    filterSettings={filterOptions}
                    allowPdfExport={true}
                    allowExcelExport={true}
                    toolbarClick={toolbarClick}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="Id"
              headerText="Id"
              width="125"
              textAlign="Center"
              isPrimaryKey={true}
              visible={false}
            />
            <ColumnDirective
              field="CounselLawFirm"
              headerText="Counsel Law Firm"
              width="125"
              textAlign="Center"
            />
            <ColumnDirective
              field="CounselEmail"
              headerText="Counsel Email"
              width="125"
            />
            <ColumnDirective
              field="CounselDomain"
              headerText="Counsel Domain"
              width="180"
            />
            <ColumnDirective
              field="IsActive"
              headerText="Status"
              width="100"
              type="boolean"
              editType="booleanedit"
              displayAsCheckBox={true}
              visible={false}
            />
            <ColumnDirective
              field="Created"
              headerText="Created"
              width="160"
              format={formatAmPm}
              type="date"
              allowEditing={false}
              visible={false}
            />
            <ColumnDirective
              field="CreatedBy"
              headerText="Created By"
              width="160"
              allowEditing={false}
              visible={false}
            />
            <ColumnDirective
              field="Modified"
              headerText="Modified"
              width="160"
              format={formatAmPm}
              type="date"
              allowEditing={false}
              visible={false}
            />
            <ColumnDirective
              field="ModifiedBy"
              headerText="ModifiedBy"
              width="160"
              allowEditing={false}
              visible={false}
            />
          </ColumnsDirective>
          <Inject
            services={[
              Page,
              Filter,
              Sort,
              Edit,
              Toolbar,
              PdfExport,
              ExcelExport,
              ColumnChooser,
              ForeignKey,
              Resize,
              DetailRow
            ]}
          />
        </GridComponent>

        <div className="e-statustext">Showing orders : <b></b></div>

        <GridComponent dataSource={dataFromCounselAddressApi} allowSelection={false}>
          <ColumnsDirective>
            <ColumnDirective field="LocationName" headerText="Location Name" width="100" />
            <ColumnDirective field="AddressLine1" headerText="AddressLine 1" width="150" />
            <ColumnDirective field="AddressLine2" headerText="AddressLine 2" width="150" />
            <ColumnDirective field="City" headerText="City" width="150" />
            <ColumnDirective field="StateProvinceId" headerText="State Province Id" width="150" />
          </ColumnsDirective>
        </GridComponent>

        <GridComponent dataSource={dataFromCounselAttorneyApi} allowSelection={false}>
          <ColumnsDirective>
            <ColumnDirective field="LastName" headerText="Last Name" width="100" />
            <ColumnDirective field="FirstName" headerText="First Name" width="150" />
            <ColumnDirective field="MiddleName" headerText="Middle Name" width="150" />
            <ColumnDirective field="DisplayName" headerText="Display Name" width="150" />
            <ColumnDirective field="BarNumber" headerText="Bar Number" width="150" />
            <ColumnDirective field="Email" headerText="Email" width="150" />
            <ColumnDirective field="Phone" headerText="Phone" width="150" />
          </ColumnsDirective>
        </GridComponent>
      </div>
    </div>
  );
}
export default TableMaster;









