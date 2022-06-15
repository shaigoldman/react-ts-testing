import React from "react";
import { useState } from "react";
import Monster, { Bogieman } from './Monster';

type mbProps = {
  monsters: Monster[]
}

function MonsterBuilder({ monsters }: mbProps) {

  const [mList, setList] = useState(monsters)
  const [johnID, setJohn] = useState("")
  const [bigness, setBigness] = useState(2);
  const [race, setRace] = useState("Standard");
  const [inApocolpyse, setApoc] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void =>
  {
    event.preventDefault();
  }

  const listMons = mList.map((m) => {
    return <li key={m.ID} id={String(m.ID)}>{m.attack()}</li>
  });

  const pushList = (m: Monster) => {
    console.log(m.ID);
    setList(previousState => {
      return [...previousState, m]
    })
    setApoc(false);
  }

  const pushListDef = () => {
    let m;
    if (race === "bogieman") {
      let angryness = "somewhat";
      if (bigness > 10) {
        angryness = "pretty";
      }  if (bigness > 15) {
        angryness = "very";
      }  if (bigness > 20) {
        angryness = "super";
      }  if (bigness > 30) {
        angryness += " mega"
      }  if (bigness > 50) {
        angryness = "VERY VERY VERY"
      } if (bigness < 0) {
        angryness = "happy"
      }
      m = new Bogieman(angryness);
    }
    else {
      m = new Monster(bigness)
    }
    pushList(m)
  }

  const pushJohn = () => {

    if (johnID === "deadJohn") {
      for (let i = 0; i < mList.length; i++) {
        if (mList[i].isJohn()) {
          mList.splice(i, 1);
          break;
        }
      }
    }

    if (!johnID.includes("john")) {
      const j = new Monster(1, "Monster Hoard");
      j.setRace("john");
      j.ID = "john" + j.ID;
      pushList(j);
      setJohn(j.ID);
    }
  }

  const killJohn = () => {
    if (johnID.includes("john")) {
      const j = document.getElementById(String(johnID));
      if (j !== null) {
        j.innerHTML = "John was slain!";
        j.id = "deadJohn";
      }
      setJohn("deadJohn");
    }
  }

  const dispJohnButton = () => {
    if (johnID.includes("john")) {
      return (
        <button onClick={killJohn}
                className={"killer"}
        >
          Destroy John!
        </button>
      )
    }
    return (
      <button onClick={pushJohn}
              className = {"summoner"}
      >
        Summon John!
      </button>
    )
  }

  const killList = () => {

    alert ("Defensive Bombs Were Launched!")
    if (inApocolpyse) {
      setList([]);
    } else {
      const m = new Monster(mList.length);
      m.setRace("Zombie Hoard");
      setList([m]);
    }
    setApoc(true);
    setJohn("deadJohn");
  }

  const showDefense = () => {
    if (mList.length > 10 || inApocolpyse) {
      return (<button onClick={killList}
                      className={"killer"}
      >
        Deploy Defense Team
      </button>)
    }
    else if (mList.length > 1) {
      return <h1>DANGER!!</h1>
    }
    return;
  }

  return (
    <>
      <h4>{mList.length!==0?"Alert List:":"Safe!"}</h4>
      <ul>{listMons}</ul>
      <button onClick={pushListDef}
              className = {"summoner"}
      >
        Build a monster
      </button>

      {dispJohnButton()}

      <p></p>

      <form onSubmit={handleSubmit} className="bignessSelect">
        <label>
          <span style={{fontWeight: "bold"}}>
            Enter monster bigness:
          </span>
          <input
            type="number"
            value={bigness}
            onChange={(e) =>
              setBigness(Number(e.target.value))}
          />
        </label>
        <span>  </span>
        <select
          value={race}
          onChange={(e) =>
            setRace(e.target.value)}
        >
          <option value="monster">Standard</option>
          <option value="bogieman">Bogie</option>
        </select>
      </form>

      <p></p>

      {showDefense()}

    </>
  )
}

export default MonsterBuilder;