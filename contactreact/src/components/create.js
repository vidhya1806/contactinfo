import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Table,
    Col
} from "reactstrap";
import SweetAlert from 'react-bootstrap-sweetalert';
const ApiUrl = 'http://localhost:8000';

class Createcontact extends Component {  
 
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangenumber = this.onChangenumber.bind(this);
        this.contactsubmit = this.contactsubmit.bind(this);
        this.cancelform = this.cancelform.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.formshow = this.formshow.bind(this);
        this.state = {
            showForm: false,
            con_name: '',
            con_email: '',
            con_num: '',
            contactlist: [],
            editid: '',
            filteredData: [],
            columns: [],
            searchInput: "",
            errmsg: "",
            formshown: 0,
            alert: null
        };
    }
    componentDidMount() {
        this.getcontactList();
    }

    deleteThisGoal(title,msg) {
        const getAlert = () => (
          <SweetAlert 
            success 
            title={title} 
            onConfirm={() => this.hideAlert()}
          >
           {msg}
          </SweetAlert>
        );
        this.getcontactList()
        this.setState({
          alert: getAlert()
        });
       
      }
    
      hideAlert() {      
        this.setState({
          alert: null
        });
      }

    getcontactList() {
        axios.get(`${ApiUrl}/contacts`).then(response => {
            this.setState({ contactlist: response.data });
        })
            .catch(function (error) {
                console.log('errmsg', error);
            })
    }
    onChangeName(e) {
        this.setState({
            con_name: e.target.value,
            errmsg: (e.target.value == "") ? "Name is Required" : ""
        });
    }
    onChangeemail(e) {
        this.setState({
            con_email: e.target.value
        });
    }
    onChangenumber(e) {
        this.setState({
            con_num: e.target.value
        });
    }
    contactsubmit(e) {
        e.preventDefault();
        if (this.state.con_name != "") {
            const obj = {
                name: this.state.con_name,
                email: this.state.con_email,
                number: (this.state.con_num == "") ? 0 : this.state.con_num
            };

            const obj1 = {
                _id: this.state.editid,
                name: this.state.con_name,
                email: this.state.con_email,
                number: (this.state.con_num == "") ? 0 : this.state.con_num
            };
            if (this.state.editid == '') {
                axios.post(`${ApiUrl}/contacts`, obj)
                    .then(res => {
                        this.cancelform();                       
                        this.deleteThisGoal('Contact','Sucessfully Created')
                       
                    });
            }
            else {
                axios.put(`${ApiUrl}/contacts`, obj1)
                    .then(res => {
                        this.cancelform();      
                        this.deleteThisGoal('Contact','Sucessfully Updated') });
            }
        } else {
            this.setState({ errmsg: "Name is Required" });
        }
    }
    edit(id, name, email, number) {
        this.setState({
            editid: id,
            con_name: name,
            con_email: email,
            con_num: (number == 0 ) ? '' : number,
            formshown: 1
        })
    }
    delete(id) {      
        axios.delete(`${ApiUrl}/contacts`, { params: { _id: id } }).then(response => {
            this.getcontactList()
            this.cancelform();
            this.deleteThisGoal('Contact','Sucessfully Deleted')    
        });
    }
    cancelform() {
        this.setState({
            con_name: '',
            con_email: '',
            con_num: '',
            editid: '',
            formshown: 0
        })
    }
    handleChange = event => {
        this.setState({ searchInput: event.target.value }, () => {
            this.globalSearch();
        });
    };
    globalSearch = () => {
        let { searchInput, contactlist } = this.state;
        let filteredDatas = contactlist.filter(value => {
         if(value.number !="" || value.name!="" || value.email!="" ){
             return (
                value.name.toLowerCase().includes(searchInput.toLowerCase()) || value.email.toLowerCase().includes(searchInput.toLowerCase()) || value.number.toString()
                .toLowerCase()
                .includes(searchInput.toLowerCase()) 
            );
        }
        });     
        this.setState({ filteredData: filteredDatas });
    };
    formshow() {
        this.setState({ formshown: 1 })
    }

    render() {
        let { columns, searchInput } = this.state;
        let listdata = (this.state.filteredData.length > 0 || searchInput != "") ? this.state.filteredData : this.state.contactlist;
        let btnstatus = (this.state.editid == '') ? 'Create' : 'Update';
        const listTable = [];
        let j = 1;

        listdata && listdata.forEach((cdata, i) => {
            listTable.push(
                <tr key={cdata._id}>
                <td>{i+1}</td>
                <td> {cdata.name} </td >
                <td> {(cdata.email !="") ? cdata.email : '-'} </td>
                <td> {(parseInt(cdata.number)) ? cdata.number : '-'}</td>
                <td>
                    <Button className="btn btn-sm btn-primary" size="sm" onClick={() => this.edit(cdata._id, cdata.name, cdata.email, cdata.number)}>Edit</Button>
                    <Button color="danger" size="sm" className="btn btn-danger ml-2" onClick={() => this.delete(cdata._id)}>delete</Button>
                </td>
            </tr>
            );
          });

        return (
            <>
                <div className="col">
                    <p className="text-center">Contact List</p>
                </div>
                <br />
                <div style={{ padding: '20px' }}>         
        {this.state.alert}
      </div>

      
                <Container className="mt--6" fluid>
                    <Row>
                        <div className="col">
                            <div className="card-wrapper">
                                <Button onClick={this.formshow} className="btn-success">Add Contact</Button>

                                {(this.state.formshown == 1) ?
                                    <Card className="mt-4" >
                                        <CardBody>
                                            <Form onSubmit={this.contactsubmit} >
                                                <Row className="mc-minimize">
                                                    <div className="col-md-2">
                                                        <label> Name </label>
                                                        <Input type="text" value={this.state.con_name} className="form-control-sm" placeholder="Name" onChange={this.onChangeName} />
                                                        <p className="text-danger">{this.state.errmsg}</p>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <label>Email  </label>
                                                        <Input type="text" className="form-control-sm" placeholder="Email" value={this.state.con_email} onChange={this.onChangeemail} /> </div>
                                                    <div className="col-md-2">
                                                        <label>Phone Number </label>
                                                        <Input className="form-control-sm" placeholder="Phone Number" value={this.state.con_num} onChange={this.onChangenumber} /> </div>
                                                    <div className="col-md-4 mt-4">
                                                        <Button onClick={this.contactsubmit}>{btnstatus}</Button>
                                                        <Button className="btn btn-danger ml-2" onClick={this.cancelform}>Close</Button> </div>
                                                </Row>

                                            </Form>
                                        </CardBody>
                                    </Card>
                                    : ""}
                            </div></div>
                    </Row>
                    <br />

                    <Card>
                        <CardBody>

                            <Input name="searchInput" value={searchInput || ""}
                                placeholder="Search"
                                className="form-control-sm col-md-2"
                                onChange={this.handleChange}
                                label="Search"
                            />

                            <table className="table table-striped" style={{ marginTop: 20 }}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {listTable.length > 0 && listTable || (<tr><td colSpan="9" className="text-center">No Rows Found</td></tr>)}
                                </tbody>
                            </table>

                        </CardBody>
                    </Card>
                </Container>
            </>
        );
    }
}

export default Createcontact