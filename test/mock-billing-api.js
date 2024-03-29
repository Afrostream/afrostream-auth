'use strict';

// security
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' || process.env.DATABASE_URL) {
  console.error('security: cannot mock on production / staging environment');
  console.error('exit 1');
  process.exit(1);
}

var config = rootRequire('config');

var nock = require('nock');

console.log('mocking ' + config.pf.url);

nock(config.pf.url)
  .persist()
  .get('/api/profiles')
  .reply(200, [{"profileId":1,"name":"VIDEO0ENG_AUDIO0ENG_SUB0FRA","broadcaster":"BOUYGUES","acceptSubtitles":"yes","createdAt":"2016-02-24 13:53:20","updatedAt":"2016-08-29 18:20:00"},{"profileId":2,"name":"VIDEO0ENG_AUDIO0FRA","broadcaster":"AFROSTREAM","acceptSubtitles":"yes","createdAt":"2016-03-23 19:27:01","updatedAt":"2016-08-29 18:20:11"},{"profileId":3,"name":"VIDEO0ENG_AUDIO0FRA","broadcaster":"BOUYGUES","acceptSubtitles":"no","createdAt":"2016-04-15 11:37:52","updatedAt":"2016-08-29 18:20:27"},{"profileId":4,"name":"VIDEO0ENG_AUDIO0FRA_AUDIO1ENG","broadcaster":"BOUYGUES","acceptSubtitles":"no","createdAt":"2016-04-28 11:05:56","updatedAt":"2016-08-29 18:20:41"},{"profileId":5,"name":"VIDEO0ENG_AUDIO0FRA_AUDIO2ENG","broadcaster":"AFROSTREAM","acceptSubtitles":"yes","createdAt":"2016-05-10 12:20:38","updatedAt":"2016-08-29 18:21:03"},{"profileId":6,"name":"VIDEO0ENG_AUDIO0FRA_AUDIO1ENG","broadcaster":"AFROSTREAM","acceptSubtitles":"yes","createdAt":"2016-05-12 16:18:46","updatedAt":"2016-08-29 18:21:17"},{"profileId":7,"name":"VIDEO0ENG_AUDIO0ENG","broadcaster":"AFROSTREAM","acceptSubtitles":"yes","createdAt":"2016-05-12 18:03:00","updatedAt":"2016-08-29 18:21:31"},{"profileId":8,"name":"VIDEO_AUDIO_EXTRACT","broadcaster":"","acceptSubtitles":"no","createdAt":"2016-05-13 09:58:15","updatedAt":"2016-05-13 09:58:15"},{"profileId":9,"name":"VIDEO0ENG_AUDIO0FRA_AUDIO2ENG","broadcaster":"BOUYGUES","acceptSubtitles":"no","createdAt":"2016-05-19 16:49:29","updatedAt":"2016-08-29 18:21:51"},{"profileId":10,"name":"VIDEO0ENG_AUDIO0ENG_SUB0FRA","broadcaster":"ORANGE","acceptSubtitles":"yes","createdAt":"2016-05-27 15:51:24","updatedAt":"2016-08-29 18:22:03"},{"profileId":11,"name":"VIDEO0ENG_AUDIO0FRA","broadcaster":"ORANGECI","acceptSubtitles":"no","createdAt":"2016-06-01 10:30:12","updatedAt":"2016-10-25 15:53:11"},{"profileId":12,"name":"VIDEO0ENG_AUDIO0ENG_SUB0FRA","broadcaster":"ORANGECI","acceptSubtitles":"yes","createdAt":"2016-06-01 10:30:32","updatedAt":"2016-10-25 15:53:29"},{"profileId":13,"name":"VIDEO0ENG_AUDIO0FRA_AUDIO1ENG","broadcaster":"ORANGECI","acceptSubtitles":"no","createdAt":"2016-06-01 10:30:48","updatedAt":"2016-10-25 15:53:44"},{"profileId":14,"name":"VIDEO0ENG_AUDIO0FRA_AUDIO2ENG","broadcaster":"ORANGECI","acceptSubtitles":"no","createdAt":"2016-06-01 10:31:00","updatedAt":"2016-10-25 15:54:06"},{"profileId":15,"name":"VIDEO0ENG_AUDIO0FRA","broadcaster":"BOUYGUESMIAMI","acceptSubtitles":"yes","createdAt":"2016-06-01 16:11:31","updatedAt":"2016-08-29 18:22:26"},{"profileId":16,"name":"VIDEO0ENG_AUDIO0ENG","broadcaster":"BOUYGUESMIAMI","acceptSubtitles":"yes","createdAt":"2016-06-01 16:11:37","updatedAt":"2016-08-29 18:22:44"},{"profileId":17,"name":"VIDEO0ENG_AUDIO0FRA_AUDIO1ENG","broadcaster":"BOUYGUESMIAMI","acceptSubtitles":"yes","createdAt":"2016-06-01 16:12:19","updatedAt":"2016-08-29 18:23:02"},{"profileId":18,"name":"VIDEO0ENG_AUDIO0FRA_AUDIO2ENG","broadcaster":"BOUYGUESMIAMI","acceptSubtitles":"yes","createdAt":"2016-06-01 16:12:25","updatedAt":"2016-08-29 18:23:15"},{"profileId":19,"name":"VIDEO0ENG_AUDIO0FRA","broadcaster":"ORANGE","acceptSubtitles":"no","createdAt":"2016-06-06 14:51:29","updatedAt":"2016-08-29 18:23:32"},{"profileId":20,"name":"VIDEO0ENG_AUDIO0FRA_AUDIO1ENG","broadcaster":"ORANGE","acceptSubtitles":"no","createdAt":"2016-06-06 14:51:43","updatedAt":"2016-08-29 18:23:42"},{"profileId":21,"name":"VIDEO0ENG_AUDIO0FRA_AUDIO2ENG","broadcaster":"ORANGE","acceptSubtitles":"no","createdAt":"2016-06-06 14:51:46","updatedAt":"2016-08-29 18:23:53"}]);

nock(config.pf.url)
  .persist()
  .get('/api/contents/1316')
  .reply(200, [
    {
      profilesIds: [
        1,
        7,
        10,
        16
      ],
      contentId: 1316,
      uuid: "b8ed17803e02c1fe",
      md5Hash: "67c4b94698fa90fe9c877d76b3badc51",
      filename: "/space/videos/sources/Tundu_Wundu_Eng-VO_14_H264.mp4",
      state: "ready",
      size: 3218526211,
      duration: "00:26:14",
      uspPackage: "disabled",
      drm: "disabled",
      createdAt: "2016-04-13 13:39:52",
      updatedAt: "2016-09-27 18:32:19"
    }
])


nock(config.pf.url)
  .persist()
  .get('/api/contents')
  .query({md5Hash: '0123456789'})
  .reply(200, [
    {
      profilesIds: [
        1,
        7,
        10,
        16
      ],
      contentId: 1316,
      uuid: "b8ed17803e02c1fe",
      md5Hash: "0123456789",
      filename: "/space/videos/sources/Tundu_Wundu_Eng-VO_14_H264.mp4",
      state: "ready",
      size: 3218526211,
      duration: "00:26:14",
      uspPackage: "disabled",
      drm: "disabled",
      createdAt: "2016-04-13 13:39:52",
      updatedAt: "2016-09-27 18:32:19"
    }
]);

nock(config.pf.url)
  .persist()
  .get('/api/pfManifest')
  .query({contentId: 1316,broadcaster:'AFROSTREAM'})
  .reply(200, {"manifests":[
    {"type":"dash","url":"/vod/MBO_101_Afrostream_V2/d82a85af21284391.ism/d82a85af21284391.mpd"},
    {"type":"hls","url":"/vod/MBO_101_Afrostream_V2/d82a85af21284391.ism/d82a85af21284391.m3u8"},
    {"type":"smooth","url":"/vod/MBO_101_Afrostream_V2/d82a85af21284391.ism/Manifest"}
  ]});

  nock(config.pf.url)
    .persist()
    .get('/api/pfManifest')
    .query({contentId: 1316,broadcaster:'ORANGE'})
    .reply(200, {"manifests":[
      {"type":"dash","url":"/vod/MBO_101_Afrostream_V2/d82a85af21284391-orange.ism/d82a85af21284391.mpd"},
      {"type":"hls","url":"/vod/MBO_101_Afrostream_V2/d82a85af21284391-orange.ism/d82a85af21284391.m3u8"},
      {"type":"smooth","url":"/vod/MBO_101_Afrostream_V2/d82a85af21284391-orange.ism/Manifest"}
    ]});


  nock(config.pf.url)
    .persist()
    .get('/api/assetsStreams')
    .query({md5Hash: '0123456789',profileName:'VIDEO0ENG_AUDIO0ENG',broadcaster:'AFROSTREAM'})
    .reply(200, [
      {
        profilesIds: [
          1,
          7,
          10,
          16
        ],
        contentId: 1316,
        uuid: "b8ed17803e02c1fe",
        md5Hash: "0123456789",
        filename: "/space/videos/sources/Tundu_Wundu_Eng-VO_14_H264.mp4",
        state: "ready",
        size: 3218526211,
        duration: "00:26:14",
        uspPackage: "disabled",
        drm: "disabled",
        createdAt: "2016-04-13 13:39:52",
        updatedAt: "2016-09-27 18:32:19"
      }
  ]);

  nock(config.pf.url)
    .persist()
    .get('/api/assetsStreams')
    .query({md5Hash: '0123456789',profileName:'VIDEO0ENG_AUDIO0ENG_SUB0FRA',broadcaster:'ORANGE'})
    .reply(200, [
      {
        profilesIds: [
          1,
          7,
          10,
          16
        ],
        contentId: 1316,
        uuid: "b8ed17803e02c1fe",
        md5Hash: "0123456789",
        filename: "/space/videos/sources/Tundu_Wundu_Eng-VO_14_H264.mp4",
        state: "ready",
        size: 3218526211,
        duration: "00:26:14",
        uspPackage: "disabled",
        drm: "disabled",
        createdAt: "2016-04-13 13:39:52",
        updatedAt: "2016-09-27 18:32:19"
      }
  ]);

console.log('mocking ' + config.billings.url);

nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .get('/billings/api/subscriptions/')
  .query(true)
  .reply(200, {
    status: "done",
    statusMessage: "success",
    statusCode: 0,
    response: {
      subscriptions: [
        {
          subscriptionBillingUuid: "mock-billing-api",
          subscriptionProviderUuid: "mock-billing-api",
          isActive: "yes",
          user: {
            userBillingUuid: "mock-billing-api",
            userReferenceUuid: "123456",
            userProviderUuid: "mock-billing-api",
            provider: {
              providerName: "recurly"
            },
            userOpts: {
              email: "mock-billing-api",
              firstName: "mock-billing-api",
              lastName: "mock-billing-api"
            }
          },
          provider: {
            providerName: "recurly"
          },
          creationDate: "2016-02-03 10:02:50.750197+00",
          updatedDate: "2016-02-03 10:02:50.750197+00",
          subStatus: "active",
          subActivatedDate: "2015-08-31 23:00:00+00",
          subCanceledDate: null,
          subExpiresDate: null,
          subPeriodStartedDate: "2015-08-31 23:00:00+00",
          subPeriodEndsDate: "2016-08-31 23:00:00+00",
          internalPlan: {
            internalPlanUuid: "afrostreamambassadeurs2",
            name: "Ambassadeurs",
            description: "Ambassadeurs",
            amount_in_cents: "5999",
            currency: "EUR",
            cycle: "once",
            periodUnit: "year",
            periodLength: "1",
            internalPlanOpts: {
              internalMaxScreens: "2"
            }
          }
        }
      ]
    }
  });

nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .get('/billings/api/subscriptions/')
  .query(true)
  .reply(200, {
    status: "done",
    statusMessage: "success",
    statusCode: 0,
    response: {
      subscriptions: [
        {
          subscriptionBillingUuid: "mock-billing-api",
          subscriptionProviderUuid: "mock-billing-api",
          isActive: "yes",
          user: {
            userBillingUuid: "mock-billing-api",
            userReferenceUuid: "123456",
            userProviderUuid: "mock-billing-api",
            provider: {
              providerName: "gocardless"
            },
            userOpts: {
              email: "mock-billing-api",
              firstName: "mock-billing-api",
              lastName: "mock-billing-api"
            }
          },
          provider: {
            providerName: "gocardless"
          },
          creationDate: "2016-02-03 10:02:50.750197+00",
          updatedDate: "2016-02-03 10:02:50.750197+00",
          subStatus: "active",
          subActivatedDate: "2015-08-31 23:00:00+00",
          subCanceledDate: null,
          subExpiresDate: null,
          subPeriodStartedDate: "2015-08-31 23:00:00+00",
          subPeriodEndsDate: "2016-08-31 23:00:00+00",
          internalPlan: {
            internalPlanUuid: "afrostreamambassadeurs3",
            name: "Ambassadeurs",
            description: "Ambassadeurs",
            amount_in_cents: "5999",
            currency: "EUR",
            cycle: "once",
            periodUnit: "year",
            periodLength: "1",
            internalPlanOpts: {
              internalMaxScreens: "2"
            }
          }
        }
      ]
    }
  });

nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .put('/billings/api/subscriptions/mock-billing-api/cancel')
  .query(true)
  .reply(200, {
    status: "done",
    statusMessage: "success",
    statusCode: 0,
    response: {
      subscriptions: [
        {
          subscriptionBillingUuid: "mock-billing-api",
          subscriptionProviderUuid: "mock-billing-api",
          isActive: "yes",
          user: {
            userBillingUuid: "mock-billing-api",
            userReferenceUuid: "123456",
            userProviderUuid: "mock-billing-api",
            provider: {
              providerName: "gocardless"
            },
            userOpts: {
              email: "mock-billing-api",
              firstName: "mock-billing-api",
              lastName: "mock-billing-api"
            }
          },
          provider: {
            providerName: "gocardless"
          },
          creationDate: "2016-02-03 10:02:50.750197+00",
          updatedDate: "2016-02-03 10:02:50.750197+00",
          subStatus: "canceled",
          subActivatedDate: "2015-08-31 23:00:00+00",
          subCanceledDate: null,
          subExpiresDate: null,
          subPeriodStartedDate: "2015-08-31 23:00:00+00",
          subPeriodEndsDate: "2016-08-31 23:00:00+00",
          internalPlan: {
            internalPlanUuid: "afrostreamambassadeurs3",
            name: "Ambassadeurs",
            description: "Ambassadeurs",
            amount_in_cents: "5999",
            currency: "EUR",
            cycle: "once",
            periodUnit: "year",
            periodLength: "1",
            internalPlanOpts: {
              internalMaxScreens: "2"
            }
          }
        }
      ]
    }
  });

nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .put('/billings/api/users/')
  .query({userReferenceUuid: /.*/})
  .reply(200, {
    status: "done",
    statusMessage: "success",
    statusCode: 0,
    response: {
      users: [
        {
          userBillingUuid: "130fc45a-7fbe-89f9-19bf-00c06edeeac9",
          userReferenceUuid: "249235",
          userProviderUuid: "d0ea6246-dd62-a6f4-ccd3-437c3ead983b",
          provider: {
            providerName: "recurly",
            providerBillingUuid: "418dbf78-2479-4adb-937a-e6de0d55de2b"
          },
          userOpts: {
            lastName: "coelho",
            firstName: "nelson",
            email: "akiffywu-5141@yopmail.com"
          }
        }
      ]
    }
  });

nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .get('/billings/api/internalplans/')
  .query({providerName: 'bachat'}) // , userReferenceUuid: /.*/
  .reply(200, {
    status: "done",
    statusMessage: "success",
    statusCode: 0,
    response: {
      internalPlans: [
        {
          calledWithProviderNameBachat: true, // mock only
          internalPlanUuid: "bachat-afrostreammonthly",
          name: "Mensuel",
          description: "Mensuel",
          amountInCents: "699",
          amountInCentsExclTax: "559",
          vatRate: "20",
          currency: "EUR",
          cycle: "auto",
          periodUnit: "day",
          periodLength: "30",
          internalPlanOpts: {
            promoEnabled: "true",
            promoItemBasePrice: "0",
            promoItemTaxAmount: "20",
            promoItemTotal: "0",
            promoCurrency: "EUR",
            promoPeriod: "30",
            promoDuration: "0"
          },
          providerPlans: {
            bachat: {
              providerPlanUuid: "bachat-afrostreammonthly",
              name: "bachat-afrostreammonthly",
              description: "bachat-afrostreammonthly",
              provider: {
                providerName: "bachat"
              }
            }
          }
        },
        {
          calledWithProviderNameBachat: true, // mock only
          internalPlanUuid: "bachat-afrostreamdaily",
          name: "Jour",
          description: "Jour",
          amountInCents: "199",
          amountInCentsExclTax: "159",
          vatRate: "20",
          currency: "EUR",
          cycle: "auto",
          periodUnit: "day",
          periodLength: "1",
          internalPlanOpts: {
            promoEnabled: "false",
            promoItemBasePrice: "0",
            promoItemTaxAmount: "20",
            promoItemTotal: "0",
            promoCurrency: "EUR",
            promoPeriod: "1",
            promoDuration: "0"
          },
          providerPlans: {
            bachat: {
              providerPlanUuid: "bachat-afrostreamdaily",
              name: "bachat-afrostreamdaily",
              description: "bachat-afrostreamdaily",
              provider: {
                providerName: "bachat"
              }
            }
          }
        }
      ]
    }
  });


nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .get('/billings/api/couponscampaigns/')
  .query({providerName: 'afr'}) // , userReferenceUuid: /.*/
  .reply(200, {
    "status": "done",
    "statusMessage": "success",
    "statusCode": 0,
    "response": {
      "couponsCampaigns": [
        {
          "couponsCampaignBillingUuid": "4aef0220-5a52-4781-bd4b-0283a277cfe8",
          "creationDate": "2016-03-07 10:57:12.412057+00",
          "name": "campaign-test-2months",
          "description": "campaign-test-2months",
          "provider": {
            "providerName": "afr"
          },
          "internalPlan": {
            "internalPlanUuid": "afr-2months",
            "name": "Coupon 2 mois",
            "description": "Coupon 2 mois",
            "amountInCents": "1000",
            "amount": "10,00",
            "amountInCentsExclTax": "833",
            "amountExclTax": "8,33333",
            "vatRate": "20,00",
            "currency": "EUR",
            "cycle": "once",
            "periodUnit": "month",
            "periodLength": "2",
            "internalPlanOpts": {
              "internalMaxScreens": "1",
              "internalVip": "false",
              "_internalFreePeriod": "false"
            },
            "thumb": null,
            "trialEnabled": false,
            "trialPeriodUnit": null,
            "trialPeriodLength": null,
            "isVisible": true,
            "countries": [
              {
                "country": "FR"
              }
            ]
          }
        },
        {
          "couponsCampaignBillingUuid": "81f1c4ce-c191-4142-8b8a-0b8dab78d970",
          "creationDate": "2016-03-07 10:58:24.396526+00",
          "name": "campaign-test-oneyear",
          "description": "campaign-test-oneyear",
          "provider": {
            "providerName": "afr"
          },
          "internalPlan": {
            "internalPlanUuid": "afr-oneyear",
            "name": "Coupon Sérénité",
            "description": "Coupon Sérénité",
            "amountInCents": "4000",
            "amount": "40,00",
            "amountInCentsExclTax": "3333",
            "amountExclTax": "33,33333",
            "vatRate": "20,00",
            "currency": "EUR",
            "cycle": "once",
            "periodUnit": "year",
            "periodLength": "1",
            "internalPlanOpts": {
              "internalMaxScreens": "2",
              "internalVip": "true",
              "_internalFreePeriod": "false"
            },
            "thumb": null,
            "trialEnabled": false,
            "trialPeriodUnit": null,
            "trialPeriodLength": null,
            "isVisible": true,
            "countries": [
              {
                "country": "FR"
              }
            ]
          }
        },
        {
          "couponsCampaignBillingUuid": "22f57b23-7541-49e5-8e06-593a2f75135e",
          "creationDate": "2016-04-18 14:34:27.039008+00",
          "name": "campaign-test-oneday",
          "description": "campaign-test-oneday",
          "provider": {
            "providerName": "afr"
          },
          "internalPlan": {
            "internalPlanUuid": "afr-oneday",
            "name": "Coupon 1 jour",
            "description": "afr-oneday",
            "amountInCents": "10",
            "amount": "0,10",
            "amountInCentsExclTax": "8",
            "amountExclTax": "0,08333",
            "vatRate": "20,00",
            "currency": "EUR",
            "cycle": "once",
            "periodUnit": "day",
            "periodLength": "1",
            "internalPlanOpts": {
              "internalMaxScreens": "1",
              "internalVip": "false"
            },
            "thumb": null,
            "trialEnabled": false,
            "trialPeriodUnit": null,
            "trialPeriodLength": null,
            "isVisible": true,
            "countries": [
              {
                "country": "FR"
              }
            ]
          }
        },
        {
          "couponsCampaignBillingUuid": "0a41e057-12d4-4ee2-b559-c3b0c7b15b91",
          "creationDate": "2016-05-10 08:45:16.082581+00",
          "name": "campaign-afr-cfa-7days",
          "description": "campaign-afr-cfa-7days",
          "provider": {
            "providerName": "afr"
          },
          "internalPlan": {
            "internalPlanUuid": "afr-cfa-7days",
            "name": "Coupon 7 jours",
            "description": "Coupon 7 jours",
            "amountInCents": "100000",
            "amount": "1000,00",
            "amountInCentsExclTax": "84746",
            "amountExclTax": "847,45763",
            "vatRate": "18,00",
            "currency": "XOF",
            "cycle": "once",
            "periodUnit": "day",
            "periodLength": "7",
            "internalPlanOpts": {
              "internalMaxScreens": "1",
              "internalVip": "false"
            },
            "thumb": null,
            "trialEnabled": false,
            "trialPeriodUnit": null,
            "trialPeriodLength": null,
            "isVisible": true,
            "countries": [
              {
                "country": "CI"
              },
              {
                "country": "SN"
              }
            ]
          }
        },
        {
          "couponsCampaignBillingUuid": "789b58ba-5c90-4e1a-8171-2bc064fe46b3",
          "creationDate": "2016-05-10 08:44:35.08463+00",
          "name": "campaign-afr-cfa-2days",
          "description": "campaign-afr-cfa-2days",
          "provider": {
            "providerName": "afr"
          },
          "internalPlan": {
            "internalPlanUuid": "afr-cfa-2days",
            "name": "Coupon 2 jours",
            "description": "Coupon 2 jours",
            "amountInCents": "50000",
            "amount": "500,00",
            "amountInCentsExclTax": "42373",
            "amountExclTax": "423,72881",
            "vatRate": "18,00",
            "currency": "XOF",
            "cycle": "once",
            "periodUnit": "day",
            "periodLength": "2",
            "internalPlanOpts": {
              "internalMaxScreens": "1",
              "internalVip": "false"
            },
            "thumb": null,
            "trialEnabled": false,
            "trialPeriodUnit": null,
            "trialPeriodLength": null,
            "isVisible": true,
            "countries": [
              {
                "country": "CI"
              },
              {
                "country": "SN"
              }
            ]
          }
        },
        {
          "couponsCampaignBillingUuid": "b611b334-9f01-4ca6-b6ce-2eaa8633d856",
          "creationDate": "2016-05-10 08:46:48.553998+00",
          "name": "campaign-afr-cfa-1month",
          "description": "campaign-afr-cfa-1month",
          "provider": {
            "providerName": "afr"
          },
          "internalPlan": {
            "internalPlanUuid": "afr-cfa-1month",
            "name": "Coupon 1 mois",
            "description": "Coupon 1 mois",
            "amountInCents": "300000",
            "amount": "3000,00",
            "amountInCentsExclTax": "254237",
            "amountExclTax": "2542,37288",
            "vatRate": "18,00",
            "currency": "XOF",
            "cycle": "once",
            "periodUnit": "month",
            "periodLength": "1",
            "internalPlanOpts": {
              "internalMaxScreens": "1",
              "internalVip": "false"
            },
            "thumb": null,
            "trialEnabled": false,
            "trialPeriodUnit": null,
            "trialPeriodLength": null,
            "isVisible": true,
            "countries": [
              {
                "country": "CI"
              },
              {
                "country": "SN"
              }
            ]
          }
        },
        {
          "couponsCampaignBillingUuid": "ed2e3cf1-7fc5-4160-bf99-e6effd344c88",
          "creationDate": "2016-06-27 12:01:45.366499+00",
          "name": "campaign-afr-oneyear-gift",
          "description": "campaign-afr-oneyear-gift",
          "provider": {
            "providerName": "afr"
          },
          "internalPlan": {
            "internalPlanUuid": "afr-oneyear-gift",
            "name": "1 annéee as a gift",
            "description": "1 annéee as a gift",
            "amountInCents": "5999",
            "amount": "59,99",
            "amountInCentsExclTax": "4999",
            "amountExclTax": "49,99167",
            "vatRate": "20,00",
            "currency": "EUR",
            "cycle": "once",
            "periodUnit": "year",
            "periodLength": "1",
            "internalPlanOpts": [],
            "thumb": null,
            "trialEnabled": false,
            "trialPeriodUnit": null,
            "trialPeriodLength": null,
            "isVisible": true,
            "countries": []
          }
        },
        {
          "couponsCampaignBillingUuid": "a94bb541-090d-44b2-b9d2-6e557c212566",
          "creationDate": "2016-07-05 08:21:36.661731+00",
          "name": "campaign-oneweekforfree",
          "description": "campaign-oneweekfrofree",
          "provider": {
            "providerName": "afr"
          },
          "internalPlan": {
            "internalPlanUuid": "afroneweekforfree",
            "name": "7 jours offerts",
            "description": "7 jours offerts",
            "amountInCents": "0",
            "amount": "0,00",
            "amountInCentsExclTax": "0",
            "amountExclTax": "0,00000",
            "vatRate": null,
            "currency": "EUR",
            "cycle": "once",
            "periodUnit": "day",
            "periodLength": "7",
            "internalPlanOpts": [],
            "thumb": null,
            "trialEnabled": false,
            "trialPeriodUnit": null,
            "trialPeriodLength": null,
            "isVisible": true,
            "countries": []
          }
        }
      ]
    }
  });

nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .get('/billings/api/internalplans/')
  .query({providerName: /.+/}) // , userReferenceUuid: /.*/
  .reply(200, {
    status: "error",
    statusMessage: "unknown provider named : unknown",
    statusCode: 0,
    statusType: "internal",
    errors: [
      {
        error: {
          errorMessage: "unknown provider named :  unknown",
          errorType: "internal",
          errorCode: 0
        }
      }
    ]
  });

nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .get('/billings/api/internalplans/')
  .query({userReferenceUuid: /.*/})
  .reply(200, {
    status: "done",
    statusMessage: "success",
    statusCode: 0,
    response: {
      internalPlans: [
        {
          internalPlanUuid: "afrostreamgift",
          name: "Cadeau",
          description: "Cadeau",
          amountInCents: "5999",
          amountInCentsExclTax: "4799",
          vatRate: "20",
          currency: "EUR",
          cycle: "auto",
          periodUnit: "month",
          periodLength: "1",
          internalPlanOpts: [],
          providerPlans: {
            recurly: {
              providerPlanUuid: "afrostreamgift",
              name: "recurly_afrostreamgift_name",
              description: "recurly_afrostreamgift_description",
              provider: {
                providerName: "recurly"
              }
            }
          }
        },
        {
          internalPlanUuid: "afrostreampremium",
          name: "Do the right think",
          description: "Do the right think",
          amountInCents: "9999",
          amountInCentsExclTax: "7999",
          vatRate: "20",
          currency: "EUR",
          cycle: "auto",
          periodUnit: "year",
          periodLength: "1",
          internalPlanOpts: {
            internalMaxScreens: "2"
          },
          providerPlans: {
            recurly: {
              providerPlanUuid: "afrostreampremium",
              name: "recurly_afrostreampremium_name",
              description: "recurly_afrostreampremium_desc",
              provider: {
                providerName: "recurly"
              }
            }
          }
        },
        {
          internalPlanUuid: "afrostreamambassadeurs",
          name: "Ambassadeurs",
          description: "Ambassadeurs",
          amountInCents: "4999",
          amountInCentsExclTax: "3999",
          vatRate: "20",
          currency: "EUR",
          cycle: "auto",
          periodUnit: "year",
          periodLength: "1",
          internalPlanOpts: {
            internalMaxScreens: "2"
          },
          providerPlans: {
            recurly: {
              providerPlanUuid: "afrostreamambassadeurs",
              name: "afrostreamambassadeurs",
              description: "afrostreamambassadeurs",
              provider: {
                providerName: "recurly"
              }
            }
          }
        },
        {
          internalPlanUuid: "afrostreamambassadeurs2",
          name: "Ambassadeurs",
          description: "Ambassadeurs",
          amountInCents: "5999",
          amountInCentsExclTax: "4799",
          vatRate: "20",
          currency: "EUR",
          cycle: "once",
          periodUnit: "year",
          periodLength: "1",
          internalPlanOpts: [],
          providerPlans: {
            celery: {
              providerPlanUuid: "afrostreamambassadeurs",
              name: "afrostreamambassadeurs",
              description: "afrostreamambassadeurs",
              provider: {
                providerName: "celery"
              }
            }
          }
        },
        {
          internalPlanUuid: "afrostreammonthly",
          name: "Mensuel",
          description: "Mensuel",
          amountInCents: "699",
          amountInCentsExclTax: "559",
          vatRate: "20",
          currency: "EUR",
          cycle: "auto",
          periodUnit: "month",
          periodLength: "1",
          internalPlanOpts: {
            internalMaxScreens: "1"
          },
          providerPlans: {
            recurly: {
              providerPlanUuid: "afrostreammonthly",
              name: "recurly_afrostreammonthly_name",
              description: "recurly_afrostreammonthly_desc",
              provider: {
                providerName: "recurly"
              }
            }
          }
        },
        {
          internalPlanUuid: "afrostream_monthly",
          name: "Mensuel",
          description: "Mensuel",
          amountInCents: "699",
          amountInCentsExclTax: "559",
          vatRate: "20",
          currency: "EUR",
          cycle: "auto",
          periodUnit: "month",
          periodLength: "1",
          internalPlanOpts: {
            internalMaxScreens: "1"
          },
          providerPlans: {
            recurly: {
              providerPlanUuid: "afrostream_monthly",
              name: "recurly_afrostream_monthly_name",
              description: "recurly_afrostream_monthly_desc",
              provider: {
                providerName: "recurly"
              }
            }
          }
        },
        {
          internalPlanUuid: "bachat-afrostreammonthly",
          name: "Mensuel",
          description: "Mensuel",
          amountInCents: "699",
          amountInCentsExclTax: "559",
          vatRate: "20",
          currency: "EUR",
          cycle: "auto",
          periodUnit: "day",
          periodLength: "30",
          internalPlanOpts: {
            promoEnabled: "true",
            promoItemBasePrice: "0",
            promoItemTaxAmount: "20",
            promoItemTotal: "0",
            promoCurrency: "EUR",
            promoPeriod: "30",
            promoDuration: "0"
          },
          providerPlans: {
            bachat: {
              providerPlanUuid: "bachat-afrostreammonthly",
              name: "bachat-afrostreammonthly",
              description: "bachat-afrostreammonthly",
              provider: {
                providerName: "bachat"
              }
            }
          }
        },
        {
          internalPlanUuid: "bachat-afrostreamdaily",
          name: "Jour",
          description: "Jour",
          amountInCents: "199",
          amountInCentsExclTax: "159",
          vatRate: "20",
          currency: "EUR",
          cycle: "auto",
          periodUnit: "day",
          periodLength: "1",
          internalPlanOpts: {
            promoEnabled: "false",
            promoItemBasePrice: "0",
            promoItemTaxAmount: "20",
            promoItemTotal: "0",
            promoCurrency: "EUR",
            promoPeriod: "1",
            promoDuration: "0"
          },
          providerPlans: {
            bachat: {
              providerPlanUuid: "bachat-afrostreamdaily",
              name: "bachat-afrostreamdaily",
              description: "bachat-afrostreamdaily",
              provider: {
                providerName: "bachat"
              }
            }
          }
        }
      ]
    }
  });


nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .get('/billings/api/users/')
  .query({providerName: "celery", userReferenceUuid: /.*/})
  .reply(200, {
    status: "done",
    statusMessage: "success",
    statusCode: 0,
    response: {
      user: {
        userBillingUuid: "f6bd7d05-7a66-84c4-419f-b1b44ab1814a",
        userReferenceUuid: "1",
        userProviderUuid: "F_46B9F2D0-1612-179B-814D-8D9FF21954CF",
        provider: {
          providerName: "celery"
        },
        userOpts: {
          email: "tech@afrostream.tv",
          firstName: "firstNameValue",
          lastName: "lastNameValue"
        }
      }
    }
  });

nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .get('/billings/api/users/')
  .query({providerName: "recurly", userReferenceUuid: /.*/})
  .reply(200, {
    status: "done",
    statusMessage: "success",
    statusCode: 0,
    response: {
      user: {
        userBillingUuid: "f946e738-2c32-8144-d6bd-d7532256ae7b",
        userReferenceUuid: "1392",
        userProviderUuid: "oliviadigbiali@gmail.com",
        provider: {
          providerName: "recurly"
        },
        userOpts: {
          email: "oliviadigbiali@gmail.com",
          firstName: "firstNameValue",
          lastName: "lastNameValue"
        }
      }
    }
  });

nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .get('/billings/api/users/')
  .query({providerName: "gocardless"}) // , userReferenceUuid: /.*/
  .reply(200, {
    status: "done",
    statusMessage: "success",
    statusCode: 0,
    response: {
      user: {
        userBillingUuid: "f946e738-2c32-8144-d6bd-d7532256ae7b",
        userReferenceUuid: "1392",
        userProviderUuid: "oliviadigbiali@gmail.com",
        provider: {
          providerName: "gocardless"
        },
        userOpts: {
          email: "oliviadigbiali@gmail.com",
          firstName: "firstNameValue",
          lastName: "lastNameValue"
        }
      }
    }
  });

nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .get('/billings/api/users/')
  .query({providerName: "gocardless", userReferenceUuid: /.*/})
  .reply(200, {
    status: "done",
    statusMessage: "success",
    statusCode: 0,
    response: {
      user: {
        userBillingUuid: "f946e738-2c32-8144-d6bd-d7532256ae7b",
        userReferenceUuid: "1392",
        userProviderUuid: "oliviadigbiali@gmail.com",
        provider: {
          providerName: "gocardless"
        },
        userOpts: {
          email: "oliviadigbiali@gmail.com",
          firstName: "firstNameValue",
          lastName: "lastNameValue"
        }
      }
    }
  });

nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .get('/billings/api/users/')
  .query({providerName: "bachat", userReferenceUuid: /.*/})
  .reply(200, {
    status: "done",
    statusMessage: "success",
    statusCode: 0,
    response: {
      user: {
        userBillingUuid: "f946e738-2c32-8144-d6bd-d7532256ae7b",
        userReferenceUuid: "1392",
        userProviderUuid: "oliviadigbiali@gmail.com",
        provider: {
          providerName: "bachat"
        },
        userOpts: {
          email: "oliviadigbiali@gmail.com",
          firstName: "firstNameValue",
          lastName: "lastNameValue"
        }
      }
    }
  });

nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .get('/billings/api/users/')
  .query({providerName: "afr", userReferenceUuid: /.*/})
  .reply(200, {
    status: "done",
    statusMessage: "success",
    statusCode: 0,
    response: {
      user: {
        userBillingUuid: "f946e738-2c32-8144-d6bd-d7532256ae7b",
        userReferenceUuid: "1392",
        userProviderUuid: "oliviadigbiali@gmail.com",
        provider: {
          providerName: "afr"
        },
        userOpts: {
          email: "oliviadigbiali@gmail.com",
          firstName: "firstNameValue",
          lastName: "lastNameValue"
        }
      }
    }
  });

nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .get('/billings/api/users/')
  .query({providerName: "bouygues", userReferenceUuid: /.*/})
  .reply(200, {
    status: "done",
    statusMessage: "success",
    statusCode: 0,
    response: {
      user: {
        userBillingUuid: "f946e738-2c32-8144-d6bd-d7532256ae7b",
        userReferenceUuid: "1392",
        userProviderUuid: "oliviadigbiali@gmail.com",
        provider: {
          providerName: "bouygues"
        },
        userOpts: {
          email: "oliviadigbiali@gmail.com",
          firstName: "firstNameValue",
          lastName: "lastNameValue"
        }
      }
    }
  });

nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .get('/billings/api/users/')
  .query()
  .reply(200, {
    status: "error",
    statusMessage: "NOT FOUND",
    statusCode: 0,
    statusType: "internal",
    errors: [
      {
        error: {
          errorMessage: "NOT FOUND",
          errorType: "internal",
          errorCode: 0
        }
      }
    ]
  });

nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .post('/billings/api/subscriptions/')
  .reply(200, {
    "status": "done",
    "statusMessage": "success",
    "statusCode": 0,
    "response": {
      "subscription": {
        "subscriptionBillingUuid": "SubscriptionBillingUUID",
        "subscriptionProviderUuid": "SubscriptionProviderUUID",
        "isActive": "yes",
        "user": {
          "userBillingUuid": "UserBillingUUID",
          "userReferenceUuid": "afrostreamUUID",
          "userProviderUuid": "UserProviderUUID",
          "provider": {
            "providerName": "bachat"
          },
          "userOpts": {
            "email": "email@domain.com",
            "firstName": "myFirstName",
            "lastName": "myLastName"
          }
        },
        "provider": {
          "providerName": "bachat"
        },
        "internalPlan": {
          "internalPlanUuid": "bachat-afrostreamdaily",
          "name": "bachat-afrostreamdaily",
          "description": "bachat-afrostreamdaily",
          "amountInCents": "199",
          "amountInCentsExclTax": "159",
          "vatRate": "20,00",
          "currency": "EUR",
          "cycle": "auto",
          "periodUnit": "day",
          "periodLength": "1",
          "internalPlanOpts": {
            "promoEnabled": "false",
            "promoItemBasePrice": "0",
            "promoItemTaxAmount": "20",
            "promoItemTotal": "0",
            "promoCurrency": "EUR",
            "promoPeriod": "1",
            "promoDuration": "0"
          },
          "thumb": {
            "path": "/staging/billings/afrolover.jpg",
            "imgix": "https://afrostream.imgix.net/staging/billings/afrolover.jpg"
          }
        },
        "creationDate": "2015-12-25 12:00:00+00",
        "updatedDate": "2015-12-25 12:00:00+00",
        "subStatus": "active",
        "subActivatedDate": "2015-12-25 12:00:00+00",
        "subCanceledDate": null,
        "subExpiresDate": null,
        "subPeriodStartedDate": "2015-12-25 12:00:00+00",
        "subPeriodEndsDate": "2016-01-25 12:00:00+00",
        "subOpts": {
          "requestId": "requestIdValue",
          "promoEnabled": "false",
          "promoItemBasePrice": "0",
          "promoItemTaxAmount": "20",
          "promoItemTotal": "0",
          "promoCurrency": "EUR",
          "promoPeriod": "1",
          "promoDuration": "0"
        }
      }
    }
  });

nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .get('/billings/api/coupons/')
  .query({providerName: 'afr', couponCode: 'test-2months-wp4zas'})
  .reply(200, {
      "status": "done",
      "statusMessage": "success",
      "statusCode": 0,
      "response": {
        "coupon": {
          "code": "test-2months-wp4zas",
          "status": "waiting",
          "campaign": {
            "couponCampaignBillingUuid": "4aef0220-5a52-4781-bd4b-0283a277cfe8",
            "creationDate": "2016-03-07 10:57:12.412057+00",
            "name": "campaign-test-2months",
            "description": "campaign-test-2months",
            "provider": {
              "providerName": "afr"
            }, "internalPlan": {
              "internalPlanUuid": "afr-2months",
              "name": "afr-2months",
              "description": "afr-2months",
              "amountInCents": "1000",
              "amountInCentsExclTax": "833",
              "vatRate": "20,00",
              "currency": "EUR",
              "cycle": "once",
              "periodUnit": "month",
              "periodLength": "2",
              "internalPlanOpts": [],
              "thumb": null
            }
          }, "provider": {
            "providerName": "afr"
          }, "internalPlan": {
            "internalPlanUuid": "afr-2months",
            "name": "afr-2months",
            "description": "afr-2months",
            "amountInCents": "1000",
            "amountInCentsExclTax": "833",
            "vatRate": "20,00",
            "currency": "EUR",
            "cycle": "once",
            "periodUnit": "month",
            "periodLength": "2",
            "internalPlanOpts": [],
            "thumb": null
          }
        }
      }
    }
  );

nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .get('/billings/api/coupons/list')
  .query({userBillingUuid: 'mock-billing-api', couponsCampaignBillingUuid: 'mock-billing-api'})
  .reply(200, {
      "status": "done",
      "statusMessage": "success",
      "statusCode": 0,
      "response": [
        {
          "couponsCampaignBillingUuid": "4aef0220-5a52-4781-bd4b-0283a277cfe8",
          "creationDate": "2016-03-07 10:57:12.412057+00",
          "name": "campaign-test-2months",
          "description": "campaign-test-2months",
          "provider": {
            "providerName": "afr"
          },
          "internalPlan": {
            "internalPlanUuid": "afr-2months",
            "name": "Coupon 2 mois",
            "description": "Coupon 2 mois",
            "amountInCents": "1000",
            "amount": "10,00",
            "amountInCentsExclTax": "833",
            "amountExclTax": "8,33333",
            "vatRate": "20,00",
            "currency": "EUR",
            "cycle": "once",
            "periodUnit": "month",
            "periodLength": "2",
            "internalPlanOpts": {
              "internalMaxScreens": "1",
              "internalVip": "false",
              "_internalFreePeriod": "false"
            },
            "thumb": null,
            "trialEnabled": false,
            "trialPeriodUnit": null,
            "trialPeriodLength": null,
            "isVisible": true,
            "countries": [
              {
                "country": "FR"
              }
            ]
          }
        }
      ]
    }
  );

nock(config.billings.url)
  .persist() // FIXME: we should call nock on demand
  .get('/billings/api/coupons/')
  .query({providerName: 'afr', couponCode: 'test-error'})
  .reply(404, {
      "status": "error",
      "statusMessage": "NOT FOUND",
      "statusCode": 0,
      "statusType": "internal",
      "errors": [
        {
          "error": {
            "errorMessage": "NOT FOUND",
            "errorType": "internal",
            "errorCode": 0
          }
        }
      ]
    }
  );
