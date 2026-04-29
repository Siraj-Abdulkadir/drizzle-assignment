import './App.css'
import PostContent from "./PostContent"
import NavMenu from "./NavMenu"


function App() {

  

  return (

    <div className="content_div">

    <NavMenu></NavMenu>
         
  <h2 className="H2_header">Available Posts</h2>

  <br/>
  
  <br></br>

 {/* Posts Available */}
   <PostContent></PostContent>

      <br />
        <br />

   </div>

  )
}

export default App;