import React from "react";

class OutsideUtil extends React.Component {
    componentDidMount() {
      document.addEventListener("mousedown", this.handleClickOutside);
    }
  
    componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  
    handleClickOutside = event => {
      // IF exists the Ref of the wrapped component AND his dom children doesnt have the clicked component 
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        // A props callback for the ClikedClickedOutside
        this.props.onClickedOutside();
      }
    };
  
    render() {
      // In this piece of code I'm trying to get to the first not functional component
      // Because it wouldn't work if use a functional component (like <Fade/> from react-reveal)
      let firstNotFunctionalComponent = this.props.children;
      while (typeof firstNotFunctionalComponent.type === "function") {
        firstNotFunctionalComponent = firstNotFunctionalComponent.props.children;
      }
  
      // Here I'm cloning the element because I have to pass a new prop, the "reference" 
      const children = React.cloneElement(firstNotFunctionalComponent, {
        ref: node => {
          this.wrapperRef = node;
        },
        // Keeping all the old props with the new element
        ...firstNotFunctionalComponent.props
      });
  
      return <>{children}</>;
    }
  }
  
  export default OutsideUtil;