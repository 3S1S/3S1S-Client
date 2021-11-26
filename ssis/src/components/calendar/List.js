import React, { Component } from 'react';
import Middlebar from '../navi/Middlebar'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
import '../../css/calendar/list.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Moment from 'moment';
import Create from "./Create.js"
import axios from 'axios'; 

class List extends Component {
    constructor() {
        super();
        this.state = {
            show : false,
            creator : localStorage.getItem("id"),
            projectID: "",
            events : [],
            flag : [0],
            eventID : "",
        }
    }

    loadingData = async () => { 
      try { 
        let a = await this.setState({projectID: this.props.match.params.id})
          console.log("뭐지")
          console.log(this.state.projectID)
          const response = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/schedules`,{
            params:{
              project : this.state.projectID
            }
          });            
          console.log(response.data.schedule_list)
          this.setState({events: response.data.schedule_list})
      } catch (e) 
      { console.log(e); }
    };

    componentDidMount() {
      const {loadingData} = this;
        loadingData();
      }

    render() {
      console.log("강민")
      console.log(this.state.events)
        // this.state.events = [
        //     {
        //       id: 1,
        //       title: 'event 1',
        //       start: '2021-11-14',
        //       end: '2021-11-14',
        //     },
        //     {
        //       id: 2,
        //       title: 'event 2',
        //       start: '2021-11-16T13:00:00',
        //       end: '2021-11-16T18:00:00',
        //     },
        //     { id: 3, title: 'event 3', start: '2021-11-17', end: '2021-11-21' },
        //     { id: 4, title: 'event 3', start: '2021-11-16', end: '2021-11-18' },
        //   ];

        let calendar_list = this.state.events && this.state.events.map(event =>{
              if(this.state.flag[0] === 0){
                if(event.start===event.end){
                  return <div className="CalendarEvent">
                  <p className = "EventSpan1_1"> {Moment(event.start).format('MM/D')}</p>
                  <p className = "EventSpan2">{event.title}</p>
                  </div>
                }
                else{
                  return <div className="CalendarEvent">
                        <p className = "EventSpan1_2"> {Moment(event.start).format('MM/D')}~{Moment(event.end).format('MM/D')} </p>
                        <p className = "EventSpan2">{event.title}</p>
                </div>
                }
              }
              else{
                  console.log("1111111")
                  console.log(event)
                  console.log(this.state.eventID)
                  console.log(event.id)
                  if(this.state.eventID == event.id){
                    console.log("들어옴")
                    return <p className="EventSpecific">
                    <span className="EventInfoTitle">제목</span>
                    <span className="EventInfoContent">{event.title}</span>
                    <span className="EventInfoTitle">시작 일자</span>
                    <span className="EventInfoContent">{Moment(event.start).format('YYYY/MM/D')}</span>
                    <span className="EventInfoTitle">종료 일자</span>
                    <span className="EventInfoContent">{Moment(event.end).format('YYYY/MM/D')}</span>
                    <span className="EventInfoTitle2">내용</span>
                    <span className="EventInfoContent2">{event.description}</span>
                    </p>
                  }
              }
          
              }   
          ); 

          
          let content_title = this.state.flag.map(flag =>{
            if(this.state.flag[0] === 0){
              return <div className = "RightButton_cl">
                    <span className = "C_content"><b><big><big className="Big" id="event_title_right">일정 목록</big></big></b></span>
                    <Create p_id={this.state.projectID}/>
                  </div>
                  }
            else{
              return <div className = "RightButton_cl">
                    <span className = "C_content"><b><big><big className="Big" id="event_title_right">일정 세부 내용</big></big></b></span>
                    <Create p_id={this.state.projectID}/>
                  </div>
            }
          })
          
        

        return (
        <div className="Outer_cl">
            <Middlebar id={this.props.match.params}/>
            <div className = "Calendar_cl">
                <div className="LeftContent_cl">
                <FullCalendar
                    plugins={[dayGridPlugin]} //, timeGridPlugin, interactionPlugin
                    initialView="dayGridMonth"
                      events={this.state.events}
                      eventColor="#7a9acc"
                      nowIndicator
                      dateClick={(e) => console.log(e.dateStr)}
                      eventClick={(e) => {
                        console.log("777777777")
                        console.log(e.event.id); 
                        this.setState({flag: [1]})
                        this.setState({eventID: e.event.id})
                      }}
                />
                </div>
                <div className="RightContent_cl">
                  {content_title}
                  <div className="CalendarList">
                    {calendar_list}
                  </div>
                </div>
            </div>
        </div>
        );
    }
}

export default List;