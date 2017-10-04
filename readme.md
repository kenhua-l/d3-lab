# D3 Code Example Folder

I would like to disclaim that the content is purely for educational purposes. I have taken some codes and modified them to suit the need of this project. (Which is just to show a few basic data visualization example using D3.js).

### Requirements
You would need to host a simple server to view the files because of some cross origin request - when we read the .json or .csv file that is not within the file, we are doing a cross origin resource sharing - which requires a defined protocol (like http) to work.

Your best bet is to use python (easiest). Get python installed if you have not. Then run the following command in a terminal/shell from this folder - meaning you have to cd into this folder.

``python -m SimpleHTTPServer``

Now, in your browser, go to http://localhost:8000 (the port is usually 8000, unless you specify otherwise).

You should see the homepage listing the types of the data visualization.

The two common files being used by all the charts are normalize.css and d

## 1. Simple pie chart

 Pie Chart shows a donut chart (a hollow pie chart) from the weekdays.json data. It also demonstrates the use of tooltips (try hovering on the segments) and data-manipulation animation (click on the legends).

Files to refer:
</br>simplePieChart.html
</br>d3pie.js
</br>weekdays.json

## 2. Simple Bar chart

Bar Chart shows a simple bar chart with data from weekdays.csv (same as the json counterpart but of different format).

Files to refer:
</br>simpleBarChart.html
</br>d3bar.js
</br>weekdays.csv

## 3. Simple Line chart

Line Chart shows a simple line chart with data from weekdays.csv

Files to refer:
</br>simpleLineChart.html
</br>d3line.js
</br>weekdays.csv
