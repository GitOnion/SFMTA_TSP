# SFMTA TSP

## Motivation
* San Francisco has invested in a Transit Signal Priority (TSP) system, which helps buses get green lights more often.
* After implementing TSP on several lines, the city now has data to be able to answer the key question:
    * Is Transit Signal Priority resulting in improvements to travel time for MUNI bus riders?

## Goal
* Build a web tool that allows SFMTA staff (and other interested parties) to:
  * Visualize travel time improvement over time at different levels of data, including:
     * Different stops / intersections
     * Various times of day
     * Different kinds of intersection (near vs. far side stop, types of signals)
  * Visualize “dwelltime,” or how long buses stay at different stops
  * Filter and otherwise explore data on their own

## Design Strategy
* Visualization Tool
* Key Interaction: Comparisons of Travel Time
  * Stop Type:
    * Outbound vs. Inbound
    * Near side vs. Far side stops
  * Time:
    * Day of Week
    * Time of Day
  * Individual Condition:
    * Traffic Lights between Stops
* Key Metric:
  * Distributions of Bus Speed Before  vs. After TSP

## Evaluation Strategy
* Analytic Evaluation by the SFMTA staff:
  * A heuristic evaluation by the SFMTA staff providing a rating on the usability of the visualization in answering the key question, “Is Transit Signal Priority resulting in improvements to travel time for MUNI bus riders?”
  * Cognitive walk-throughs of the prototype for specific tasks using available features of the visualization
    * Will the user use a given feature?
    * If so, is the control for the action visible?
    * Is there a perceptible link between control and action?
    * Is the feedback from the feature appropriate?
* Empirical Evaluation by the project team:
    * A qualitative evaluation of the important features of the visualization by:
      * sending questionnaires/surveys to the users asking them specific to rate features of visualizations
      * conducting interviews with the users-- both individually and as part of focus groups, asking specific questions to prompt user’s judgement of the visualization
      * observing the users while using and interpreting the visualizations with and without any directions given by the project team
