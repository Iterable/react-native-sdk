const sampleMessages = [
    {
       campaignId: 1,
       messageId: "message1",
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
       priorityLevel: 200.5
    },
    {
       campaignId: 2,
       messageId: "message2",
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
       priorityLevel: 200.5
    },
    {
       campaignId: 3,
       messageId: "message3",
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
       priorityLevel: 400.5
    },
    {
       campaignId: 4,
       messageId: "message4",
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
       priorityLevel: 200.5
    },
    {
       campaignId: 5,
       messageId: "message5",
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
       priorityLevel: 400.5
    },
    {
        campaignId: 5,
        messageId: "message6",
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
        priorityLevel: 400.5
     },
     {
        campaignId: 5,
        messageId: "message7",
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
        priorityLevel: 400.5
     },
     {
        campaignId: 5,
        messageId: "message8",
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
        priorityLevel: 400.5
     },
     {
        campaignId: 5,
        messageId: "message9",
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
        priorityLevel: 400.5
     },
     {
        campaignId: 5,
        messageId: "message10",
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
        priorityLevel: 400.5
     }
 ]
 
 export default sampleMessages