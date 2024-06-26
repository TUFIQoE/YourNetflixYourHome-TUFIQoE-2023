# YourNetflixYourHome

Chrome extension and Python/flask REST API for [ecologically valid](https://en.wikipedia.org/wiki/Ecological_validity) QoE experiment using Netflix streaming platform. 
<b>Does NOT require usage of Netflix-1080p extension.</b>


# Technology stack
Frontend (Chrome extension)
- Webpack
- React
- Typescript
- HTML
- CSS (SASS)

Backend
- Node.js (Express.js)
- Sqlite3


## Installing and Running

### Procedures:

1. Check if your [Node.js](https://nodejs.org/) version is >= **14**.
2. Clone this repository.
3. Go to /extension folder.
4. Run `npm install` to install the dependencies.
5. Run `npm run build`
6. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder.
7. Run backend:
    1. cd into `backend` directory
    2. Download dependents `npm install`
    3. Start server `node server.js`
8. Happy hacking.

# Glossary
- empty config - configuration file that does NOT contain all of the key-value pairs required to run experiment 
    - mapping applicable
    - NOT experiment applicable

- complete config - configuration file that does contain all of the key-value pairs required to run experiment
    - mapping applicable (can be regenerated)
    - experiment applicable

- Bitrate to VMAF mapping - process of discovering VMAF substitutes to bitrate values available for a video in Netflix streaming platform. It is done by iterating. In this mode there is no communication with server.


# Configuration file

## Empty config file
```
{
  "assessment_interval": 150,
  "bitrate_interval": 150,
  "description": "description",
  "title": "title",
  "videos": [
    {
      "description": "",
      "name": "wielka_woda_s01e01",
      "url": "https://www.netflix.com/watch/81387423",
      "vmaf_template_scenario": [
        90,50,40,70,60,30,60,80,100,80,70,100,90,50,40,20
      ]
    }
  ]
}
```

## Complete config file
```
{
  "assessment_interval": 150,
  "bitrate_interval": 150,
  "description": "",
  "title": "",
  "videos": [
    {
      "bitrate_vmaf_map": [
        {
          "bitrate": 101,
          "vmaf": 45
        },
        {
          "bitrate": 124,
          "vmaf": 55
        },
        {
          "bitrate": 153,
          "vmaf": 60
        },
        {
          "bitrate": 234,
          "vmaf": 71
        },
        {
          "bitrate": 364,
          "vmaf": 78
        },
        {
          "bitrate": 533,
          "vmaf": 83
        },
        {
          "bitrate": 949,
          "vmaf": 89
        },
        {
          "bitrate": 1618,
          "vmaf": 92
        },
        {
          "bitrate": 2919,
          "vmaf": 94
        },
        {
          "bitrate": 5886,
          "vmaf": 96
        }
      ],
      "description": "wielka_woda_s01e01",
      "name": "",
      "url": "https://www.netflix.com/watch/81387423",
      "vmaf_template_scenario": [
        90,50,40,70,60,30,60,80,100,80,70,100,90,50,40,20
      ],
      "scenario": [
        {
          "bitrate": 949,
          "vmaf": 89,
          "vmaf_template": 90,
          "vmaf_diff": 1
        },
        {
          "bitrate": 124,
          "vmaf": 55,
          "vmaf_template": 50,
          "vmaf_diff": 5
        },
        {
          "bitrate": 101,
          "vmaf": 45,
          "vmaf_template": 40,
          "vmaf_diff": 5
        },
        {
          "bitrate": 234,
          "vmaf": 71,
          "vmaf_template": 70,
          "vmaf_diff": 1
        },
        {
          "bitrate": 101,
          "vmaf": 45,
          "vmaf_template": 30,
          "vmaf_diff": 15
        },
        {
          "bitrate": 153,
          "vmaf": 60,
          "vmaf_template": 60,
          "vmaf_diff": 0
        },
        {
          "bitrate": 153,
          "vmaf": 60,
          "vmaf_template": 60,
          "vmaf_diff": 0
        },
        {
          "bitrate": 364,
          "vmaf": 78,
          "vmaf_template": 80,
          "vmaf_diff": 2
        },
        {
          "bitrate": 5886,
          "vmaf": 96,
          "vmaf_template": 100,
          "vmaf_diff": 4
        },
        {
          "bitrate": 364,
          "vmaf": 78,
          "vmaf_template": 80,
          "vmaf_diff": 2
        },
        {
          "bitrate": 234,
          "vmaf": 71,
          "vmaf_template": 70,
          "vmaf_diff": 1
        },
        {
          "bitrate": 5886,
          "vmaf": 96,
          "vmaf_template": 100,
          "vmaf_diff": 4
        },
        {
          "bitrate": 949,
          "vmaf": 89,
          "vmaf_template": 90,
          "vmaf_diff": 1
        },
        {
          "bitrate": 124,
          "vmaf": 55,
          "vmaf_template": 50,
          "vmaf_diff": 5
        },
        {
          "bitrate": 101,
          "vmaf": 45,
          "vmaf_template": 40,
          "vmaf_diff": 5
        },
        {
          "bitrate": 101,
          "vmaf": 45,
          "vmaf_template": 20,
          "vmaf_diff": 25
        }
      ]
    }
  ]
}
```

# CREDITS
All work was done within the TUFIQoE experiment at [AGH University of Science and Technology](https://www.agh.edu.pl/en/) in Kraków, Poland. The team members are:
- **Lucjan Janowski** - product owner, concepts
- **Mateusz Olszewski** - project leader, server, testing, documentation. contact: [mbolszewski@student.agh.edu.pl](mailto:mbolszewski@student.agh.edu.pl), treat me as a **contact person** for this project
- **Gabriela Wielgus** - experiment leader
- **Rafał Figlus** - web extension

# Acknowledgments

The software development leading to this repository has received funding from the Norwegian Financial Mechanism 2014-2021 under project 2019/34/H/ST6/00599.


