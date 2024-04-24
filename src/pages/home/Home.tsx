import "./home.scss"
import TopBox from "../../components/topbar/Topbar"
import Chartbox from "../../components/chartbox/Chartbox"
import Tinychart  from "../../components/tinychart/Tinychart"
import Smallchart  from "../../components/smallchart/Smallchart"
import Recoveredchart from "../../components/recoveredchart/Recoveredchart"
import Activechart from "../../components/activechart/Activechart"
import Piechart from "../../components/piechart/Piechart"
import Secondbarchart from "../../components/secondbarchart/Secondbarchart"
import Newcasesbarchart from "../../components/barchart/Newcasesbarchart"

const Home = () => {
  return (
    <div className="home">
      <div className="box box1"><TopBox /></div>
      <div className="box box2"><Tinychart apiHost={"coronavirus-smartable.p.rapidapi.com"} apiKey={"458a59c65amsh41181a971e743a4p1204d0jsn77ed08dc1f68"} /></div>
      <div className="box box3"><Smallchart apiHost={"coronavirus-smartable.p.rapidapi.com"} apiKey={"458a59c65amsh41181a971e743a4p1204d0jsn77ed08dc1f68"}/></div>
      <div className="box box4"><Piechart apiHost={"coronavirus-smartable.p.rapidapi.com"} apiKey={"458a59c65amsh41181a971e743a4p1204d0jsn77ed08dc1f68"}/></div>
      <div className="box box5"><Recoveredchart apiHost={"coronavirus-smartable.p.rapidapi.com"} apiKey={"458a59c65amsh41181a971e743a4p1204d0jsn77ed08dc1f68"}/></div>
      <div className="box box6"><Activechart apiHost={"coronavirus-smartable.p.rapidapi.com"} apiKey={"458a59c65amsh41181a971e743a4p1204d0jsn77ed08dc1f68"}/></div>
      <div className="box box7"><Chartbox /></div>
      <div className="box box8"><Newcasesbarchart apiHost={"coronavirus-smartable.p.rapidapi.com"} apiKey={"458a59c65amsh41181a971e743a4p1204d0jsn77ed08dc1f68"}/></div>
      <div className="box box9"><Secondbarchart apiHost={"coronavirus-smartable.p.rapidapi.com"} apiKey={"458a59c65amsh41181a971e743a4p1204d0jsn77ed08dc1f68"}/></div>
    </div>
  )
}

export default Home