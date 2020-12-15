// TODO : handleBoardCreate
const dummyBoardData = {
  projectId: "project1",
  handleBoardCreate: () => console.log("create!"),
  handleBoardDelete: (id: string) => console.log("delete", id),
  handleTaskClick: (id: string) => console.log("click", id),
  handleTaskCreate: () => console.log("create!"),
  handleTaskDelete: (id: string) => console.log("delete", id),
  boards: [
    {
      id: "board22123123121",
      title: "TO DO",
      boardColumnIndex: 0,
      task: [
        {
          id: "task1",
          boardRowIndex: 0,
          sprintRowIndex: 0,
          title: "Client storybook project setting and dependencies test",
          startDate: "1584172961096",
          endDate: "1611017454633",
          taskIndex: 20,
          userTask: [
            {
              user: {
                id: "user1",
                username: "Hailey",
                avatar:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5GhFjpnH0lzP7B2g3k2DSt98xoiJsfMtYdA&usqp=CAU",
              },
            },
            {
              user: {
                id: "user2",
                username: "Dongoc",
                avatar:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKY-hpd7QcVCVoLifuOMwtZYSLnLkWOswLXA&usqp=CAU",
              },
            },
          ],
          taskLabel: [
            {
              label: {
                id: "label1",
                name: "Storybook",
                color: "labelViolet",
              },
            },
            {
              label: {
                id: "label2",
                name: "Setup",
                color: "violet",
              },
            },
          ],
        },
        {
          id: "dkkasdj",
          title: "Hotfix | Edit RoundButton Iconype",
          startDate: "1584172961096",
          boardRowIndex: 1,
          sprintRowIndex: 0,
          endDate: null,
          taskIndex: 21,
          userTask: [],
          taskLabel: [
            {
              label: {
                id: "label3",
                name: "Bug",
                color: "failDark",
              },
            },
          ],
        },
        {
          id: "task35433412dk",
          title: "Page | Login Page Development",
          boardRowIndex: 2,
          sprintRowIndex: 0,
          startDate: "1584172961096",
          endDate: "1611017454633",
          taskIndex: 20,
          userTask: [
            {
              user: {
                id: "user2",
                username: "Si Choi",
                avatar:
                  "https://electrek.co/wp-content/uploads/sites/3/2020/08/Tesla-Elon-Musk.jpg?quality=82&strip=all",
              },
            },
            {
              user: {
                id: "user2",
                username: "Pbkim",
                avatar:
                  "https://www.investopedia.com/thmb/PA0DhNMY2cGhy0tmZMx8aD8-YZQ=/3000x2089/filters:fill(auto,1)/GettyImages-849890606-c069ca46f1894da4a78505cb660b3bd1.jpg",
              },
            },
          ],
          taskLabel: [
            {
              label: {
                id: "label1",
                name: "Atomic",
                color: "failDark",
              },
            },
            {
              label: {
                id: "label2",
                name: "Dev",
                color: "violet",
              },
            },
            {
              label: {
                id: "label2",
                name: "Apollo",
                color: "warning",
              },
            },
          ],
        },
        {
          id: "dongonconfire",
          title: "Arrange meeting with clients",
          startDate: "1584172961096",
          endDate: null,
          taskIndex: 21,
          boardRowIndex: 0,
          sprintRowIndex: 0,
          userTask: [
            {
              user: {
                id: "dongoc1",
                username: "DongOc On Fire",
                avatar:
                  "https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg",
              },
            },
            {
              user: {
                id: "GomugomuKje",
                username: "King Jeong Un",
                avatar:
                  "https://dispatch.cdnser.be/wp-content/uploads/2018/06/20180607225725_f.jpg",
              },
            },
          ],
          taskLabel: [
            {
              label: {
                id: "labelisMissing",
                name: "Phone",
                color: "labelOrange",
              },
            },
            {
              label: {
                id: "labelisMissing",
                name: "Meeting",
                color: "labelYellow",
              },
            },
          ],
        },
        {
          id: "fixCoffeeMachine",
          title: "Meeting with VCs",
          startDate: "1584172961096",
          endDate: "1611017454633",
          boardRowIndex: 0,
          sprintRowIndex: 0,
          taskIndex: 20,
          userTask: [
            {
              user: {
                id: "slkadfjsafhwoifhwoewofe",
                username: "Marc Andressen",
                avatar:
                  "https://i2.wp.com/a16z.com/wp-content/uploads/2015/08/MarcAndreessen.jpg?resize=400%2C400&ssl=1",
              },
            },
            {
              user: {
                id: "fsdklfoifhuorf",
                username: "Jeff Bezos",
                avatar:
                  "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5bb22ae84bbe6f67d2e82e05%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D560%26cropX2%3D1783%26cropY1%3D231%26cropY2%3D1455",
              },
            },
          ],
          taskLabel: [
            {
              label: {
                id: "PitchdeckisAwesome",
                name: "IR",
                color: "fail",
              },
            },
            {
              label: {
                id: "lfjaklsdfjlfjlasdfj",
                name: "Meeting",
                color: "violet",
              },
            },
          ],
        },
        // {
        //   id: "task2",
        //   title: "Washing Dishes",
        //   startDate: "1584172961096",
        //   endDate: null,
        //   taskIndex: 21,
        //   userTask: [],
        //   taskLabel: [
        //     {
        //       label: {
        //         id: "label3",
        //         name: "cleanup",
        //         color: "labelTeal",
        //       },
        //     },
        //   ],
        // },
        // {
        //   id: "task1",
        //   title: "Reading Books",
        //   startDate: "1584172961096",
        //   endDate: "1611017454633",
        //   taskIndex: 20,
        //   userTask: [
        //     {
        //       user: {
        //         id: "user1",
        //         username: "Hailey",
        //         avatar: null,
        //       },
        //     },
        //     {
        //       user: {
        //         id: "user2",
        //         username: "Dongoc",
        //         avatar: null,
        //       },
        //     },
        //   ],
        //   taskLabel: [
        //     {
        //       label: {
        //         id: "label1",
        //         name: "books",
        //         color: "fail",
        //       },
        //     },
        //     {
        //       label: {
        //         id: "label2",
        //         name: "science",
        //         color: "violet",
        //       },
        //     },
        //   ],
        // },
        // {
        //   id: "task2",
        //   title: "Washing Dishes",
        //   startDate: "1584172961096",
        //   endDate: null,
        //   taskIndex: 21,
        //   userTask: [],
        //   taskLabel: [
        //     {
        //       label: {
        //         id: "label3",
        //         name: "cleanup",
        //         color: "labelTeal",
        //       },
        //     },
        //   ],
        // },
        // {
        //   id: "task1",
        //   title: "Reading Books",
        //   startDate: "1584172961096",
        //   endDate: "1611017454633",
        //   taskIndex: 20,
        //   userTask: [
        //     {
        //       user: {
        //         id: "user1",
        //         username: "Hailey",
        //         avatar: null,
        //       },
        //     },
        //     {
        //       user: {
        //         id: "user2",
        //         username: "Dongoc",
        //         avatar: null,
        //       },
        //     },
        //   ],
        //   taskLabel: [
        //     {
        //       label: {
        //         id: "label1",
        //         name: "books",
        //         color: "fail",
        //       },
        //     },
        //     {
        //       label: {
        //         id: "label2",
        //         name: "science",
        //         color: "violet",
        //       },
        //     },
        //   ],
        // },
        // {
        //   id: "task2",
        //   title: "Washing Dishes",
        //   startDate: "1584172961096",
        //   endDate: null,
        //   taskIndex: 21,
        //   userTask: [],
        //   taskLabel: [
        //     {
        //       label: {
        //         id: "label3",
        //         name: "cleanup",
        //         color: "labelTeal",
        //       },
        //     },
        //   ],
        // },
        // {
        //   id: "task1",
        //   title: "Reading Books",
        //   startDate: "1584172961096",
        //   endDate: "1611017454633",
        //   taskIndex: 20,
        //   userTask: [
        //     {
        //       user: {
        //         id: "user1",
        //         username: "Hailey",
        //         avatar: null,
        //       },
        //     },
        //     {
        //       user: {
        //         id: "user2",
        //         username: "Dongoc",
        //         avatar: null,
        //       },
        //     },
        //   ],
        //   taskLabel: [
        //     {
        //       label: {
        //         id: "label1",
        //         name: "books",
        //         color: "fail",
        //       },
        //     },
        //     {
        //       label: {
        //         id: "label2",
        //         name: "science",
        //         color: "violet",
        //       },
        //     },
        //   ],
        // },
        // {
        //   id: "task2",
        //   title: "Washing Dishes",
        //   startDate: "1584172961096",
        //   endDate: null,
        //   taskIndex: 21,
        //   userTask: [],
        //   taskLabel: [
        //     {
        //       label: {
        //         id: "label3",
        //         name: "cleanup",
        //         color: "labelTeal",
        //       },
        //     },
        //   ],
        // },
      ],
    },
    {
      id: "board23123122",
      title: "IN PROGRESS",
      boardColumnIndex: 1,
      task: [
        {
          id: "tagakdsk",
          title: "Retrievo Server Dev CICD system test",
          boardRowIndex: 0,
          startDate: "1584172961096",
          endDate: "1611017454633",
          sprintRowIndex: 0,
          taskIndex: 301,
          userTask: [
            {
              user: {
                id: "user3",
                username: "Si Choi",
                avatar:
                  "https://upload.wikimedia.org/wikipedia/commons/0/0f/%EC%A0%95%EC%9A%A9%EC%A7%84-%EC%8B%A0%EC%84%B8%EA%B3%84%EA%B7%B8%EB%A3%B9-%EB%B6%80%ED%9A%8C%EC%9E%A5_Chung_Yong-jin.jpg",
              },
            },
            {
              user: {
                id: "user2",
                username: "Dongoc",
                avatar:
                  "https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/2B1N/image/PONzW9zAIS2Hg7UrLXxKQN27l3U.jpg",
              },
            },
            {
              user: {
                id: "user4",
                username: "dkje",
                avatar:
                  "https://images.unsplash.com/photo-1525591932088-8eb7ed314934?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzM4fHxwcm9maWxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "user5",
                username: "pbkim",
                avatar:
                  "https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzE3fHxwcm9maWxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
          ],
          taskLabel: [
            {
              label: {
                id: "akasdgakeo",
                name: "Hotfix",
                color: "labelOrange",
              },
            },
          ],
        },
        {
          id: "tagakdsk",
          title:
            "What's that CI/CDFix server error 20053 and write troubleShooting log",
          boardRowIndex: 0,
          sprintRowIndex: 0,
          startDate: "1584172961096",
          endDate: "1611017454633",
          taskIndex: 301,
          userTask: [
            {
              user: {
                id: "user3",
                username: "Si Choi",
                avatar:
                  "https://images.unsplash.com/photo-1520048480367-7a6a4b6efb2a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzQ5fHxwcm9maWxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "user2",
                username: "Dongoc",
                avatar:
                  "https://images.unsplash.com/photo-1561588951-583249cd5060?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzU3fHxwcm9maWxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "user5",
                username: "pbkim",
                avatar:
                  "https://images.unsplash.com/photo-1513207565459-d7f36bfa1222?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
          ],
          taskLabel: [
            {
              label: {
                id: "label5",
                name: "Retrievo!",
                color: "labelCyan",
              },
            },
            {
              label: {
                id: "akasdgakeo",
                name: "Development",
                color: "labelViolet",
              },
            },
          ],
        },
        {
          id: "asdgggg",
          title: "Hoxy | Let me in",
          boardRowIndex: 0,
          sprintRowIndex: 0,
          startDate: "1584172961096",
          endDate: "1611017454633",
          taskIndex: 301,
          userTask: [
            {
              user: {
                id: "user3",
                username: "Si Choi",
                avatar:
                  "https://images.unsplash.com/photo-1520048480367-7a6a4b6efb2a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzQ5fHxwcm9maWxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "user2",
                username: "Dongoc",
                avatar:
                  "https://images.unsplash.com/photo-1561588951-583249cd5060?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzU3fHxwcm9maWxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "user5",
                username: "pbkim",
                avatar:
                  "https://images.unsplash.com/photo-1513207565459-d7f36bfa1222?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
          ],
          taskLabel: [
            {
              label: {
                id: "label5",
                name: "Retrievo!",
                color: "fail",
              },
            },
          ],
        },
      ],
    },
    {
      id: "bo3412312423123ard3",
      title: "DONE",
      boardColumnIndex: 2,
      task: [
        {
          id: "dnbiw",
          title: "What's Dat Prod Deploy",
          boardRowIndex: 0,
          sprintRowIndex: 0,
          startDate: null,
          endDate: "1611017454633",
          taskIndex: 20,
          userTask: [
            {
              user: {
                id: "ak39vm3",
                username: "Retriever",
                avatar:
                  "https://images.unsplash.com/photo-1563306406-e66174fa3787?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "dkgkasd",
                username: "Dongoc",
                avatar:
                  "https://images.unsplash.com/photo-1513207565459-d7f36bfa1222?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "dkgkasd",
                username: "PangyoBuldak",
                avatar:
                  "https://images.unsplash.com/photo-1562003389-902303a38425?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjZ8fGdpcmx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
          ],
          taskLabel: [],
        },
        {
          id: "qisdn49d",
          title: "Storybook Setting",
          boardRowIndex: 0,
          sprintRowIndex: 0,
          startDate: "1584172961096",
          endDate: "1611017454633",
          taskIndex: 301,
          userTask: [
            {
              user: {
                id: "asdgh",
                username: "Si Choi",
                avatar:
                  "https://lh3.googleusercontent.com/proxy/FcgLIGSPcDhJemxkroKOGhstI-SagaJZ9K7BlmxR3jP_lb3XPnX3gE9Y-RBVTpRv1TpzP0WT0Zg3FSVojI3Jev44Tf_0uvhSsg-vDphJ5Ust1apv_GWSmpLAY-AR",
              },
            },
            {
              user: {
                id: "ashjk",
                username: "Dongoc",
                avatar:
                  "https://yt3.ggpht.com/ytc/AAUvwnjqgs2fR9IuVGk1nYDHbQ20hiUv7oPT_qsPtTmQrQ=s900-c-k-c0x00ffffff-no-rj",
              },
            },
            {
              user: {
                id: "uiouhg",
                username: "dkje",
                avatar:
                  "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "erehd",
                username: "pbkim",
                avatar:
                  "https://images.unsplash.com/photo-1482555670981-4de159d8553b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzN8fGdpcmx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
          ],
          taskLabel: [
            {
              label: {
                id: "label5",
                name: "Atomic",
                color: "fail",
              },
            },
            {
              label: {
                id: "akasdgakeo",
                name: "Storybook",
                color: "labelPink",
              },
            },
          ],
        },
        {
          id: "dfhvd",
          title: "Offline Meeing @Seoul",
          boardRowIndex: 0,
          sprintRowIndex: 0,
          startDate: "1584172961096",
          endDate: "1611017454633",
          taskIndex: 301,
          userTask: [
            {
              user: {
                id: "user3",
                username: "Si Choi",
                avatar:
                  "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "user5",
                username: "pbkim",
                avatar:
                  "https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
          ],
          taskLabel: [
            {
              label: {
                id: "label5",
                name: "Meeting",
                color: "labelCyan",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sdfkjfdkf",
      title: "REVIEW",
      boardColumnIndex: 2,
      task: [
        {
          id: "asdhgah",
          title: "Retrievo's Birthday Party",
          boardRowIndex: 0,
          sprintRowIndex: 0,
          startDate: null,
          endDate: "1611017454633",
          taskIndex: 20,
          userTask: [
            {
              user: {
                id: "ak39vm3",
                username: "Retriever",
                avatar:
                  "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "dkgkasd",
                username: "Dongoc",
                avatar:
                  "https://images.unsplash.com/photo-1543207564-1271b510019d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTE5fHx3b21hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "dkgkasd",
                username: "PangyoBuldak",
                avatar:
                  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
          ],
          taskLabel: [],
        },
        {
          id: "dsdfr",
          title: "What's Dat Prod Deploy",
          boardRowIndex: 0,
          sprintRowIndex: 0,
          startDate: null,
          endDate: "1611017454633",
          taskIndex: 20,
          userTask: [
            {
              user: {
                id: "ak39vm3",
                username: "Retriever",
                avatar:
                  "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjl8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "dkgkasd",
                username: "Dongoc",
                avatar:
                  "https://images.unsplash.com/photo-1519648023493-d82b5f8d7b8a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTZ8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "dkgkasd",
                username: "PangyoBuldak",
                avatar:
                  "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Njd8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
          ],
          taskLabel: [],
        },
        {
          id: "qisdnjhgg49d",
          title: "Inhouse advertisement feedback",
          boardRowIndex: 0,
          sprintRowIndex: 0,
          startDate: "1584172961096",
          endDate: "1611017454633",
          taskIndex: 301,
          userTask: [
            {
              user: {
                id: "asdgh",
                username: "Si Choi",
                avatar:
                  "https://images.unsplash.com/photo-1540174401473-df5f1c06c716?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTA4fHxwcm9maWxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "ashjk",
                username: "Dongoc",
                avatar:
                  "https://images.unsplash.com/photo-1535368362808-e21d5f250bed?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTI3fHxwcm9maWxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "uiouhg",
                username: "dkje",
                avatar:
                  "https://images.unsplash.com/photo-1529758146491-1e11fd721f77?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTMzfHxwcm9maWxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "erehd",
                username: "pbkim",
                avatar:
                  "https://images.unsplash.com/photo-1512875651085-a5d7c5c09c82?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTY1fHxwcm9maWxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
          ],
          taskLabel: [
            {
              label: {
                id: "label5",
                name: "Atomic!",
                color: "fail",
              },
            },
            {
              label: {
                id: "akasdgakeo",
                name: "Storybook",
                color: "labelPink",
              },
            },
          ],
        },
        {
          id: "dfhvhgjhd",
          title: "Offline Meeing @Seoul",
          boardRowIndex: 0,
          sprintRowIndex: 0,
          startDate: "1584172961096",
          endDate: "1611017454633",
          taskIndex: 301,
          userTask: [
            {
              user: {
                id: "user3",
                username: "Si Choi",
                avatar:
                  "https://images.unsplash.com/photo-1520517601640-32ec514e4a15?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTc0fHxwcm9maWxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "user2",
                username: "Dongoc",
                avatar:
                  "https://images.unsplash.com/photo-1542310538-7df3a6688674?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTgyfHxwcm9maWxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "user4",
                username: "dkje",
                avatar:
                  "https://images.unsplash.com/photo-1540683512676-41ee1d5883df?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTk3fHxwcm9maWxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
            {
              user: {
                id: "user5",
                username: "pbkim",
                avatar:
                  "https://images.unsplash.com/photo-1527609617096-4d1e03b4fcb9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjA5fHxwcm9maWxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
              },
            },
          ],
          taskLabel: [
            {
              label: {
                id: "akasdgakeo",
                name: "Storybook",
                color: "labelPink",
              },
            },
          ],
        },
      ],
    },
  ],
};
export default dummyBoardData;
