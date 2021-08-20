const sampleMessages = [
   {
      campaignId: 1,
      messageId: 1,
      trigger: "",
      createdAt: "2021-07-21 12:20:00",
      expiresAt: "2021-10-21 12:20:00",
      content: {
         html: "<html><head></head><body>Test</body></html>",
         inAppDisplaySettings: {
            top: {
               percentage: 0
            },
            right: {
               percentage: 0
            },
            bottom: {
               percentage: 0
            },
            left: {
               percentage: 0
            }
         }
      },
      saveToInbox: true,
      inboxMetadata: {
         title: "CATS FOR SALE!! LIMITED TIME!!",
         subtitle: "All this week!!",
         icon: "icon1.png"
      },
      customPayload: {},
      read: false,
      priorityLevel: 200.5,
      last: false
   },
   {
      campaignId: 2,
      messageId: 2,
      trigger: "",
      createdAt: "2021-07-21 2:20:00",
      expiresAt: "2021-10-21 2:20:00",
      content: {
        html: "<html><head></head><body>Test</body></html>",
        inAppDisplaySettings: {
           top: {
              percentage: 0
           },
           right: {
              percentage: 0
           },
           bottom: {
              percentage: 0
           },
           left: {
              percentage: 0
           }
        }
     },
      saveToInbox: false,
      inboxMetadata: {
         title: "THIS WEEKEND ONLY",
         subtitle: "Trucks Trucks Trucks",
         icon: "icon2.png"
      },
      customPayload: {},
      read: true,
      priorityLevel: 200.5,
      last: false
   },
   {
      campaignId: 3,
      messageId: 3,
      trigger: "",
      createdAt: "2021-07-21 4:00:00",
      expiresAt: "2021-10-21 4:00:00",
      content: {
        html: "<html><head></head><body>Test</body></html>",
        inAppDisplaySettings: {
           top: {
              percentage: 0
           },
           right: {
              percentage: 0
           },
           bottom: {
              percentage: 0
           },
           left: {
              percentage: 0
           }
        }
     },
      saveToInbox: true,
      inboxMetadata: {
         title: "Iterable wants you!",
         subtitle: "Hackathon going on Monday",
         icon: "icon3.png"
      },
      customPayload: {},
      read: false,
      priorityLevel: 400.5,
      last: false
   },
   {
      campaignId: 4,
      messageId: 4,
      trigger: "",
      createdAt: "2021-07-21 2:00:00",
      expiresAt: "2021-10-21 2:00:00",
      content: {
        html: "<html><head></head><body>Test</body></html>",
        inAppDisplaySettings: {
           top: {
              percentage: 0
           },
           right: {
              percentage: 0
           },
           bottom: {
              percentage: 0
           },
           left: {
              percentage: 0
           }
        }
     },
      saveToInbox: true,
      inboxMetadata: {
         title: "Happy Birthday Buddy",
         subtitle: "All the cake for you!?",
         icon: "icon4.png"
      },
      customPayload: {},
      read: true,
      priorityLevel: 200.5,
      last: false
   },
   {
      campaignId: 5,
      messageId: 5,
      trigger: "",
      createdAt: "2021-07-21 12:20:00",
      expiresAt: "2021-07-21 12:20:00",
      content: {
        html: "<html><head></head><body>Test</body></html>",
        inAppDisplaySettings: {
           top: {
              percentage: 0
           },
           right: {
              percentage: 0
           },
           bottom: {
              percentage: 0
           },
           left: {
              percentage: 0
           }
        }
     },
      saveToInbox: true,
      inboxMetadata: {
         title: "Dog Moms Unite!",
         subtitle: "Show up at the dog park",
         icon: "icon5.png"
      },
      customPayload: {},
      read: false,
      priorityLevel: 400.5,
      last: false
   },
   {
       campaignId: 5,
       messageId: 6,
       trigger: "",
       createdAt: "2021-07-21 12:20:00",
       expiresAt: "2021-07-21 12:20:00",
       content: {
        html: "<html><head></head><body>Test</body></html>",
        inAppDisplaySettings: {
           top: {
              percentage: 0
           },
           right: {
              percentage: 0
           },
           bottom: {
              percentage: 0
           },
           left: {
              percentage: 0
           }
        }
     },
       saveToInbox: true,
       inboxMetadata: {
          title: "Dog Moms Unite!",
          subtitle: "Show up at the dog park",
          icon: "icon5.png"
       },
       customPayload: {},
       read: false,
       priorityLevel: 400.5,
       last: false
    },
    {
       campaignId: 5,
       messageId: 7,
       trigger: "",
       createdAt: "2021-07-21 12:20:00",
       expiresAt: "2021-07-21 12:20:00",
       content: {
        html: "<html><head></head><body>Test</body></html>",
        inAppDisplaySettings: {
           top: {
              percentage: 0
           },
           right: {
              percentage: 0
           },
           bottom: {
              percentage: 0
           },
           left: {
              percentage: 0
           }
        }
     },
       saveToInbox: true,
       inboxMetadata: {
          title: "Dog Moms Unite!",
          subtitle: "Show up at the dog park",
          icon: "icon5.png"
       },
       customPayload: {},
       read: false,
       priorityLevel: 400.5,
       last: false
    },
    {
       campaignId: 5,
       messageId: 8,
       trigger: "",
       createdAt: "2021-07-21 12:20:00",
       expiresAt: "2021-07-21 12:20:00",
       content: {
        html: "<html><head></head><body>Test</body></html>",
        inAppDisplaySettings: {
           top: {
              percentage: 0
           },
           right: {
              percentage: 0
           },
           bottom: {
              percentage: 0
           },
           left: {
              percentage: 0
           }
        }
     },
       saveToInbox: true,
       inboxMetadata: {
          title: "Dog Moms Unite!",
          subtitle: "Show up at the dog park",
          icon: "icon5.png"
       },
       customPayload: {},
       read: false,
       priorityLevel: 400.5,
       last: false
    },
    {
       campaignId: 5,
       messageId: 9,
       trigger: "",
       createdAt: "2021-07-21 12:20:00",
       expiresAt: "2021-07-21 12:20:00",
       content: {
        html: "<html><head></head><body>Test</body></html>",
        inAppDisplaySettings: {
           top: {
              percentage: 0
           },
           right: {
              percentage: 0
           },
           bottom: {
              percentage: 0
           },
           left: {
              percentage: 0
           }
        }
     },
       saveToInbox: true,
       inboxMetadata: {
          title: "Dog Moms Unite!",
          subtitle: "Show up at the dog park",
          icon: "icon5.png"
       },
       customPayload: {},
       read: false,
       priorityLevel: 400.5,
       last: false
    },
    {
       campaignId: 5,
       messageId: 10,
       trigger: "",
       createdAt: "2021-07-21 12:20:00",
       expiresAt: "2021-07-21 12:20:00",
       content: {
        html: "<html><head></head><body>Test</body></html>",
        inAppDisplaySettings: {
           top: {
              percentage: 0
           },
           right: {
              percentage: 0
           },
           bottom: {
              percentage: 0
           },
           left: {
              percentage: 0
           }
        }
     },
       saveToInbox: true,
       inboxMetadata: {
          title: "Dog Moms Unite!",
          subtitle: "Show up at the dog park",
          icon: "icon5.png"
       },
       customPayload: {},
       read: false,
       priorityLevel: 400.5,
       last: true
    }
]
 
 export default sampleMessages