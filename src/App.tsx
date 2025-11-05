import { Login } from "./pages/Login";
import { supabase } from "./supabase/supabase-client";

function App() {



  const example = async () => {
    let { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
    console.log(profiles, error);
  };
  
  example();




  return (
    <>
      <Login></Login>
    </>
  );
}

export default App;
