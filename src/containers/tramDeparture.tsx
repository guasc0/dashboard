import React, {useState} from "react";
import styled from "styled-components";

const BASE_URL = "/bin/rest.exe/v2, API VERSION: 1.10.1, HOST: https://api.vasttrafik.se"

export const TramDeparture: React.FC<any> = (tramdDataSolros, tramDataMunk) => {
    const [depTime, setDepTime] = useState<string[]>([]);
    let solrosList: any[] = [];
    let munkList: any[] = [];
    const setLists = (list: any, listToSet: any) => {
        console.log(list);
        if (list.Departure) {
            list.Departure.forEach((dep: any) => {
                listToSet.push(dep.rtTime);
            })
        }
    }
    setLists(tramdDataSolros, solrosList);
    setLists(tramDataMunk, munkList);
    const calcDepTime = (departures: any) => {
        solrosList = [];
        departures.forEach((dep: any, index: number) => {
            let startTime = new Date();
            let endTime = dep.rtTime ? new Date(dep.date + 'T' + dep.rtTime) : new Date(dep.date + 'T' + dep.time) ;
            let difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
            let resultInMinutes = Math.round(difference / 60000);
            //console.log(time);
            //tramdData.tramData.Departure[index].rtTime = resultInMinutes.toString();
            //setDepTime((depTime: { rtTime: string; }[]) => [...depTime, depTime[index].rtTime = resultInMinutes.toString() + '2']);
            resultInMinutes = resultInMinutes -1
            if (resultInMinutes === 0) {
                solrosList.push('Nu');
            } else if (resultInMinutes < 0 || isNaN(resultInMinutes)){
                solrosList.splice(index, 1);
                tramdDataSolros.Departure.splice(index, 1);
            } else {
                solrosList.push(resultInMinutes.toString())
            }
        })
        setDepTime(solrosList);
        console.log(depTime);

    }
    setInterval(() => {
        calcDepTime(tramdDataSolros.tramdDataSolros.Departure);
        calcDepTime(tramDataMunk.Departure);
    }, 5000);
    let tramNr = 0;
    return (
        <StyledWeather>
          <h4> Trams and stuff !!!!!!!!!!</h4>
            <div style={{display: "flex"}}>
                <div>
                    <table>
                        <th>Linje</th>
                        <th>Ändhållplats</th>
                        <th>Avgår om (min)</th>
                        {tramdDataSolros.tramDataSolros.Departure.map((dep: any, index: number) => {
                            return (
                                <>
                                    <tr>
                                        <td><Board id={index.toString()}>{setTramNr(dep.name.substring(dep.name.length -1, dep.name.length), index.toString())}</Board></td>
                                        <td style={{paddingRight: 20}}>{setTramEnd(dep.direction)}</td>
                                        <td style={{width: 150}}>{depTime[index]}</td>
                                    </tr>
                                </>
                            );
                        })}
                        {tramdDataSolros.tramDataMunk.Departure.map((dep: any, index: number) => {
                            return (
                                <>
                                    <tr>
                                        <td><Board id={index.toString()}>{setTramNr(dep.name.substring(dep.name.length -1, dep.name.length), index.toString())}</Board></td>
                                        <td style={{paddingRight: 20}}>{setTramEnd(dep.direction)}</td>
                                        <td style={{width: 150}}>{depTime[index]}</td>
                                    </tr>
                                </>
                            );
                        })}
                    </table>
                </div>
            </div>
        </StyledWeather>
    );
}

const setTramNr = (tramNr: string, id: string) => {
    let nr = document.getElementById(id);
    if (tramNr === '3' && nr) {
        nr.style.backgroundColor = 'blue'
    }
    if (tramNr === '5' && nr) {
        nr.style.backgroundColor = 'red'
    }
    if (tramNr === '1' && nr) {
        nr.style.backgroundColor = 'white'
        nr.style.color = 'black'
    }
    return tramNr;
}
const setTramEnd = (name: string): string => {
    let endStation = '';
    switch (name) {
        case 'Virginsgatan (Göteborg kn)':
            endStation = 'Kålltorp'
            break
        case 'Göteborg Axel Dahlströms torg':
            endStation = 'Marklandsgatan'
            break;
        case 'Kålltorp':
            endStation = 'Kålltorp'
            break
        case 'Göteborg Östra sjukhuset':
            endStation = 'Östra Sjukhuset';
            break;
        case 'Göteborg Marklandsgatan':
            endStation = 'Marklandsgatan';
            break;
        case 'Göteborg Varmfrontsgatan':
            endStation = 'Länsmansgården';
            break;
    }
    return endStation;
}

const Board = styled.div`
  background-color: #ee0e0e;
  border-radius: 5px;
  color: white;
  margin: auto;
  text-align: center;
  width: 40px;
`;

const StyledWeather = styled.div`
  border-radius: 10px;
  //display: flex;
  justify-content: flex-start;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 640px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.35);
  padding: 5px 5px 0 5px;
  margin-top: 20px;
  margin-left: 20px;

  img {
    width: 30px;
    height: 30px;
  }

  h4 {
    margin: 0 0 0 5px;
    padding: 0 0 0 5px;
  }

  h5 {
    margin: 0 0 0 7px;
    font-size: 13px;
  }

  h2 {
    margin: 10px 0 10px 0;
  }

  td {
    border-bottom: 1px solid #050505;
    text-align: left;
    padding: 3px;
    font-weight: bold;
    font-size: 17px;
  }
  
  th {
    text-align: left;
    margin-right: 20px;
    border-bottom: 1px solid black;
  }
  
  table {
    margin: 10px;
  }
  p {
    margin: 0 20px 0 0px;
  }
`;