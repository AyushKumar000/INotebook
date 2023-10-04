import Note from "./Note";

const Home = (props) => {
  return (
    <div>
      <Note feedSetAlert = {props.feedSetAlert}/>
    </div>
  );
};

export default Home;
