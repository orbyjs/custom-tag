# @orby/custom-tag

Allows to encapsulate the render function of "@orby/core" within a web-component, allowing the reulitization of the component by invoking it in the html or within other libraries.

```jsx
import {h} from "@orby/core";
import register from "@orby/custom-tag";

function MyTag(props){
    useEffect(()=>{
        console.log("web-component mounted")
        return ()=>{
            console.log("web-component dismounted")
        }
    },[]);
    return <h1>i am web-component {props.value}</h1>
}

register(<my-tag scoped props={["value"]}>{MyTag}</my-tag>)
```

|Property|Type|Default|Description|
|--------|----|-------|-----------|
| scoped | boolean | false | initialize the component with shadow-dom |
| props  | array | []  | allows to observe the mutation of the properties associated with the web-component |
