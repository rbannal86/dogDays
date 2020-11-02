import React from "react";
import HeaderDeco from "../HeaderDeco/HeaderDeco";

import "./UserGuide.css";

export default function UserGuide() {
  return (
    <div className={"user_guide_main"}>
      <h2 className={"user_guide_title"}>User Guide</h2>
      <div className={"user_guide_contents"}>
        <h3>Contents</h3>
        <ol>
          <li
            onClick={() =>
              document
                .getElementById("the_dashboard")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            The Dashboard
          </li>
          <li
            onClick={() =>
              document
                .getElementById("the_calendar")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            The Calendar
          </li>
          <li
            onClick={() =>
              document
                .getElementById("calendar_views")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Calendar Views
          </li>
          <li
            onClick={() =>
              document
                .getElementById("adding_activities")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Adding Activities
          </li>
          <li
            onClick={() =>
              document
                .getElementById("the_color_scale")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            The Color Scale
          </li>
          <li
            onClick={() =>
              document
                .getElementById("day_details")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Day Details
          </li>
          <li
            onClick={() =>
              document
                .getElementById("dog_details")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Dog Details
          </li>
          <li
            onClick={() =>
              document
                .getElementById("dog_list")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Dog List
          </li>
          <li
            onClick={() =>
              document
                .getElementById("add_dog")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Add Dog
          </li>
        </ol>
      </div>
      <div className={"user_guide_section"} id={"the_dashboard"}>
        <h3>The Dashboard</h3>

        <img
          src={"Images/CalendarYear.png"}
          alt={"dashboard view"}
          className={"user_guide_image"}
        />
        <p className={"user_guide_copy"}>
          After logging in and selecting a dog (if more than one dog is
          associated with the user account), the user is presented with the
          dashboard. From here, all of the available functions of dogDays are
          easily accessible.
        </p>
      </div>
      <div className={"user_guide_section"} id={"the_calendar"}>
        <h3>The Calendar</h3>
        <img
          src={"Images/CalendarMonth.png"}
          alt={"calendar month view"}
          className={"user_guide_image"}
        />
        <p className={"user_guide_copy"}>
          The calendar is the main component of dogDays. Here, the average score
          for all activities in a day will be displayed by the appropriate
          color.
        </p>
        <p className={"user_guide_copy"}>
          The default view for the calendar shows the entire year. Using the
          calendar navigation buttons discussed in the next section are easy
          ways to change the view, but a user can also click on the date
          displayed next to their user name in order to quickly focus on the
          week which contains today's date.
        </p>
      </div>
      <div className={"user_guide_section"} id={"calendar_views"}>
        <h3>Calendar Views</h3>
        <img
          src={"Images/CalendarWeek.png"}
          alt={"calendar week view"}
          className={"user_guide_image"}
        />
        <p className={"user_guide_copy"}>
          The calendar view buttons located underneath the dog's display name
          can be used to change the calendar display between week, month, and
          year. When displaying the year or the month, the user may click upon a
          month or week in order to change the view to that month or week.
        </p>
        <p className={"user_guide_copy"}>
          The arrow buttons above the calendar may be used to navigate either
          forwards or backwards through the calendar while maintaining the
          current view.
        </p>
      </div>
      <div className={"user_guide_section"} id={"adding_activities"}>
        <h3>Adding Activities</h3>
        <img
          src={"Images/AddActivityType.png"}
          alt={"Add activity prompt for type of activity"}
          className={"user_guide_image"}
        />
        <p className={"user_guide_copy"}>
          When the calendar is displaying a week, the user can click on any day,
          which will then open up the activity form. The first step for the user
          is to select the type of activity. This selection has no bearing on
          the score calculation, but allows for the user to have a more detailed
          look at the dog's progress.
        </p>
        <img
          src={"Images/AddActivityQuality.png"}
          alt={"Add activity prompt for quality of activity"}
          className={"user_guide_image"}
        />
        <p className={"user_guide_copy"}>
          After selecting an activity, the user is then prompted to select one
          of three scores for the dog, each represented by a smiley face. After
          selecting the score, a new total score is calculated and the color for
          the day in all calendar views is updated.
        </p>
      </div>
      <div className={"user_guide_section"} id={"the_color_scale"}>
        <h3>The Color Scale</h3>
        <div className={"user_guide_color_scale"}>
          <HeaderDeco />
        </div>
        <p className={"user_guide_copy"}>
          The intent of dogDays is to show progress in a dog through the diplay
          of a color gradient placed onto a calendar. In order to show progress,
          days with more successful activities will have a lighter color, while
          poorer days will be darker.
        </p>
      </div>
      <div className={"user_guide_section"} id={"day_details"}>
        <h3>Day Details</h3>
        <img
          src={"Images/DayDetails.png"}
          alt={"Day details main view"}
          className={"user_guide_image"}
        />
        <p className={"user_guide_copy"}>
          When a user clicks on the Day Details button in the button row, the
          user may then click on any day in either the week or month display to
          see that activities that have been logged for that day. While in that
          view, the user may delete any activity. By clicking on the Day Details
          button again, the normal function of clicking on a day is restored to
          both the week and month views.
        </p>
      </div>
      <div className={"user_guide_section"} id={"dog_details"}>
        <h3>Dog Details</h3>
        <img
          src={"Images/DogDetailsInitial.png"}
          alt={"Dog details main view"}
          className={"user_guide_image"}
        />
        <p className={"user_guide_copy"}>
          When the user clicks on the Dog Detail button in the button row, a
          display will open up showing the current dog's name, breed, and
          birthday. The user may click on the Dog Detail button or the cancel
          button at the bottom of the display to close the Dog Details display.
        </p>
        <img
          src={"Images/DogDetailsEdit.png"}
          alt={"Dog details edit view"}
          className={"user_guide_image"}
        />
        <p className={"user_guide_copy"}>
          By clicking on the Edit button, the user is able to change any of the
          information about the dog.
        </p>
        <img
          src={"Images/DogDetailsDelete.png"}
          alt={"Dog details delete dog confirmation"}
          className={"user_guide_image"}
        />
        <p className={"user_guide_copy"}>
          By clicking on the Delete button, the user is able to permanently
          delete the dog. The user will be asked to confirm this decision before
          all records are deleted. After the records are deleted, the user will
          be returned to the Dog Selection view or the Add Dog form.
        </p>
      </div>
      <div className={"user_guide_section"} id={"dog_list"}>
        <h3>Dog List</h3>
        <img
          src={"Images/DogSelection.png"}
          alt={"The dog selection display"}
          className={"user_guide_image"}
        />
        <p className={"user_guide_copy"}>
          When the user presses on the Dog List button in the button row, they
          can change which dog for which they are viewing records. After some
          actions, such as deleting dog records, this view will automatically
          show up.
        </p>
      </div>
      <div className={"user_guide_section"} id={"add_dog"}>
        <h3>Add Dog</h3>
        <img
          src={"Images/AddDog.png"}
          alt={"The add dog form"}
          className={"user_guide_image"}
        />
        <p className={"user_guide_copy"}>
          When the Add Dog button in the button row is pressed, the Add Dog form
          will be displayed in the Dashboard. Here, the user may add a new dog
          to track. A new user will automatically be directed to this form. When
          a new dog is added, that dog is automatically selected as the focus.
        </p>
      </div>
    </div>
  );
}
