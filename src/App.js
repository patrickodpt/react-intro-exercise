import React from 'react';

const singleAssignment = (assignmentObject) => {
  return (
    <div>
      <span>Assignment Name: {assignmentObject.name}</span>
      <span>Assignment Grade: {assignmentObject.grade}</span>
    </div>
  )
}

const courseGrade = (grades) => {
  if (grades.length < 1) {
    return "N/A"
  }
  console.log('grades', grades)
  return Math.floor(grades.reduce((sum, g) => sum + g, 0) / grades.length)
}

const singleCourse = (course) => {
  return (
    <div className="course">
      <h3>{course.courseName}</h3>
      <ul>
        {course.assignments.map(singleAssignment)}
      </ul>

      <ul>
        <li>
          Course Average: {
          courseGrade(course.assignments.map(assignment => assignment.grade))
          }
        </li>
      </ul>

    </div>
  )
}

const courseContainer = (listsOfCourseObjects) => {
  return (
    <div className="courseContainer">
      {listsOfCourseObjects.map(singleCourse)}
    </div>
  )
}

class CourseForm extends React.Component {

  state = {
    newAssign: {
      name: "",
      grade: ""
    }
  }

  handleChange = (evnt) => {

    let newAssign = {...this.state.newAssign}

    if(evnt.target.type === "number") {
      newAssign[evnt.target.name] = Number(evnt.target.value);
    }
    else {
      newAssign[evnt.target.name] = evnt.target.value;
    }


    this.setState({ newAssign })
  }

  handleFormSubmission = (evnt) => {
    evnt.preventDefault();
    this.props.addNewClass(this.state.newAssign)
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmission}>
        <select>
          <option selected value="SEI 23">SEI 23</option>
          <option value="Data Science 101">Data Science 101</option>
          <option value="MTRE 1401">MTRE 1401</option>
        </select>
        <input
          type="text"
          placeholder="assignment name"
          name="name"
          value={this.state.newAssign.name}
          onChange={this.handleChange}
        />
        <input
          type="number"
          placeholder="assignment grade"
          name="grade"
          value={this.state.newAssign.grade}
          onChange={this.handleChange}
        />
        <input type="submit" value="add"/>
      </form>
    )
  }
}


class App extends React.Component {

  state = {
    courseList:[
    {
      courseName : "SEI 23",
      assignments: [
        {
          name: "Recursion",
          grade: 0
        },
         {
          name: "Big O",
          grade: 100
        },
        {
          name: "Binary Trees",
          grade: 100
        }
      ]
    },
    {
      courseName : "Data Science 101",
      assignments: [
        {
          name: "Machine Learning",
          grade: 56
        },
         {
          name: "Python",
          grade: 42
        },
        {
          name: "Pandas",
          grade: 100
        }
      ]
    },
    {
      courseName : "MTRE 1401",
      assignments: [
            {
              name: "Machine Learning",
              grade: 100
            },
             {
              name: "Python",
              grade: 100
            },
            {
              name: "Pandas",
              grade: 100
            }
        ]
      }
    ]
  }

  addNewAssign = (newAssign) => {
    console.log(newAssign)
    let courseList = [...this.state.courseList]

    courseList[0].assignments.push(newAssign)

    this.setState({courseList})
  }



  render() {
    return (
      <div>
        <h1>ASSIGNMENTS</h1>
        <CourseForm
          addNewClass={this.addNewAssign}
        />
        {courseContainer( this.state.courseList )}
      </div>
    );
  }
};

export default App;
