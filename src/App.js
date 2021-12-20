import React, { Component } from 'react';
import {useState} from 'react';
import './App.css';
import catalogue from './components/catalogue.js';
import categories from './components/categories.js';
import Multiselect from 'multiselect-react-dropdown';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {            
            catalogue : catalogue,   
            search: null,
            choices: null,      
            brand_choices: [],
            gender_choices: [],      
            prod_choices: [],
            //options: [{name: 'Unisex', id: 10},{name: 'Girls', id: 2},{name: "Women", id: 3}],
            gender: categories["Gender"],
            brands: categories["Brands"],
            prod_options: categories["Products"],
        };
        this.multiselectRef = React.createRef();
        this.onSelect = this.onSelect.bind(this)
        this.onRemove = this.onRemove.bind(this)
    }

    getSelected() {
        //this.multiselectRef.current.getSelectedItems();
        alert(this.multiselectRef.current.getSelectedItems());
    }

    searchSpace=(event)=>{
        //if(event.keyCode == 13){
            let keyword = event.target.value;
            this.setState({search:keyword})
        //}
    }

    onSelect(selectedList, selectedItem) {
        if(selectedItem.type=='brand'){
            var blist = this.state.brand_choices;
            blist.push(selectedItem.name);
            this.setState({brand_choices:blist});
        }
        else if(selectedItem.type=='gender'){
            var glist = this.state.gender_choices;
            glist.push(selectedItem.name);
            this.setState({gender_choices:glist});            
        }
        else if(selectedItem.type=='prod'){
            var plist = this.state.prod_choices;
            plist.push(selectedItem.name);
            this.setState({prod_choices:plist});            
        }
        /*
        let choicelist = this.state.choices 
        if(choicelist==null) {
            let keylist = selectedList.map(item => item.name);
            this.setState({choices:keylist});
        }
        else {
            for(let i =0;i<selectedList.length;i++){
                if(choicelist.includes(selectedList[i].name)==false) {
                    alert("brand");
                    choicelist.push(selectedList[i].name);
                }
            }        
            this.setState({choices:choicelist});
        }
        //alert(blist);
        //alert(glist);
        */
        this.setState({search:null});        
    }

    onRemove(selectedList, removedItem) {
        if(removedItem.type=='brand'){
            alert(this.state.brand_choices);
            var blist = this.state.brand_choices;
            const index = blist.indexOf(removedItem.name);
            if (index > -1) {
                blist.splice(index, 1);
            }            
            this.setState({brand_choices:blist});
            alert(this.state.brand_choices);
        }
        else if(removedItem.type=='gender'){
            var glist = this.state.gender_choices;
            const index = glist.indexOf(removedItem.name);
            if (index > -1) {
                glist.splice(index, 1);
            }                        
            this.setState({gender_choices:glist});            
        }
        else if(removedItem.type=='prod'){
            var plist = this.state.prod_choices;
            const index = plist.indexOf(removedItem.name);
            if (index > -1) {
                plist.splice(index, 1);
            }                        
            this.setState({prod_choices:plist});            
        }
        /*
            let keylist = selectedList.map(item => item.name);
            //alert(selectedList.length==0);
            if(selectedList.length==0)
                this.setState({choices:null});    
            else
                this.setState({choices:keylist});
            this.setState({search:null});           
        */
    }

    render() {
        const {catalogue} = this.state;
        const products = catalogue["products"];  
        //var brand_filt_count =
        const brandFilt = products.filter((product)=>{
            //let choicelist = this.state.choices 
            let brandlist = this.state.brand_choices
            //if(choicelist == null)
            if(brandlist.length==0)
                return product
            else if(brandlist.includes(product.brand))
                return product
        });
        const genderFilt = brandFilt.filter((product)=>{
            //let choicelist = this.state.choices 
            let genlist = this.state.gender_choices
            //if(choicelist == null)
            if(genlist.length==0)
                return product
            else if(genlist.includes(product.gender))
                return product
        });
        const prodFilt = genderFilt.filter((product)=>{
            //let choicelist = this.state.choices 
            let prodlist = this.state.prod_choices
            //if(choicelist == null)
            if(prodlist.length==0)
                return product
            else if(prodlist.includes(product.category))
                return product
        });
        const items = /*products*/prodFilt.filter((product)=>{
            if(this.state.search == null)
                return product
            else if(product.productName.toLowerCase().includes(this.state.search.toLowerCase()) || product.brand.toLowerCase().includes(this.state.search.toLowerCase())){
                return product
            }
        });
        return(
          <div className="App">
            <h1 className="header">Myntna</h1>  
                <><div>
                <Multiselect
                    options={this.state.prod_options} // Options to display in the dropdown
                    selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                    onSelect={this.onSelect} // Function will trigger on select event
                    onRemove={this.onRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    placeholder="Select Category"
                    showCheckbox={true}
                    ref={this.multiselectRef} />
            </div><div>
                    <Multiselect
                        options={this.state.gender} // Options to display in the dropdown
                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                        onSelect={this.onSelect} // Function will trigger on select event
                        onRemove={this.onRemove} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                        placeholder="Select Gender"
                        showCheckbox={true}
                        ref={this.multiselectRef} />
                </div><div>
                    <Multiselect
                        options={this.state.brands} // Options to display in the dropdown
                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                        onSelect={this.onSelect} // Function will trigger on select event
                        onRemove={this.onRemove} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                        placeholder="Select Brands"
                        showCheckbox={true}
                        ref={this.multiselectRef} />
                </div><div>
                    <input type="text" placeholder="Search Items" onChange={(e) => this.searchSpace(e)} />
                </div><div className="item">
                    {items.map(product => (

                        <div>
                            <p className="title"><b>{product.productName}</b></p>
                            <img src={product.searchImage} width="350" height="350"></img>
                            <p className="body"><b>Category: </b>{product.category}</p>
                            <p className="body"><b>Brand: </b>{product.brand}</p>
                            <p className="body"><b>Gender: </b>{product.gender}</p>                                                        
                        </div>

                    ))}
                </div></>
          </div>
        );
    }
  }
  
  export default App;