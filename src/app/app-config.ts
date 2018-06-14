export class AppConfig {
  public static REST_BASE_URL = 'http://10.195.77.192:3010';
  public static WS_URL = 'ws://10.195.77.192';

  public static POST_DEPLOY_CONTRACT_TOPO = [
    {
        'srcMAC': '02:00:00:00:00:20',
        'Messages': [
            {
                'signals': [
                    {
                        'CANID': 'CAN-FD',
                        'Receivers': 'H_U,CLU,HUD',
                        'destMAC': '01:00:5E:00:03:C0',
                        'signalID': 23,
                        'destIP': '239.0.3.192',
                        'signalName': 'V2X_WrngDis'
                    },
                    {
                        'CANID': 'CAN-FD',
                        'Receivers': 'H_U,CLU,HUD',
                        'destMAC': '01:00:5E:00:03:C0',
                        'signalID': 23,
                        'destIP': '239.0.3.192',
                        'signalName': 'V2X_WrngDstDis'
                    },
                    {
                        'CANID': 'CAN-FD',
                        'Receivers': 'H_U,CLU,HUD',
                        'destMAC': '01:00:5E:00:03:C0',
                        'signalID': 23,
                        'destIP': '239.0.3.192',
                        'signalName': 'V2X_DrvInfoDis'
                    },
                    {
                        'CANID': 'CAN-FD',
                        'Receivers': 'H_U,CLU,HUD',
                        'destMAC': '01:00:5E:00:03:C0',
                        'signalID': 23,
                        'destIP': '239.0.3.192',
                        'signalName': 'V2X_TrfLtStaDis'
                    },
                    {
                        'CANID': 'CAN-FD',
                        'Receivers': 'H_U,CLU,HUD',
                        'destMAC': '01:00:5E:00:03:C0',
                        'signalID': 23,
                        'destIP': '239.0.3.192',
                        'signalName': 'V2X_TrfLtTimeVal'
                    },
                    {
                        'CANID': 'CAN-FD',
                        'Receivers': 'ICU,H_U,CLU,HUD',
                        'destMAC': '01:00:5E:00:03:C0',
                        'signalID': 23,
                        'destIP': '239.0.3.192',
                        'signalName': 'V2X_PWSta'
                    },
                    {
                        'CANID': 'CAN-FD',
                        'Receivers': 'ICU,H_U,CLU,HUD',
                        'destMAC': '01:00:5E:00:03:C0',
                        'signalID': 23,
                        'destIP': '239.0.3.192',
                        'signalName': 'V2X_OWSta'
                    },
                    {
                        'CANID': 'CAN-FD',
                        'Receivers': 'ICU,H_U,CLU,HUD',
                        'destMAC': '01:00:5E:00:03:C0',
                        'signalID': 23,
                        'destIP': '239.0.3.192',
                        'signalName': 'V2X_VWSta'
                    },
                    {
                        'CANID': 'CAN-FD',
                        'Receivers': 'ICU,H_U,CLU,HUD',
                        'destMAC': '01:00:5E:00:03:C0',
                        'signalID': 23,
                        'destIP': '239.0.3.192',
                        'signalName': 'V2X_CRSta'
                    },
                    {
                        'CANID': 'CAN-FD',
                        'Receivers': 'ICU,H_U,CLU,HUD',
                        'destMAC': '01:00:5E:00:03:C0',
                        'signalID': 23,
                        'destIP': '239.0.3.192',
                        'signalName': 'V2X_AZSta'
                    },
                    {
                        'CANID': 'CAN-FD',
                        'Receivers': 'ICU,H_U,CLU,HUD',
                        'destMAC': '01:00:5E:00:03:C0',
                        'signalID': 23,
                        'destIP': '239.0.3.192',
                        'signalName': 'V2X_TISta'
                    },
                    {
                        'CANID': 'CAN-FD',
                        'Receivers': 'ICU,H_U,CLU,HUD',
                        'destMAC': '01:00:5E:00:03:C0',
                        'signalID': 23,
                        'destIP': '239.0.3.192',
                        'signalName': 'V2X_WISta'
                    }
                ],
                'messageName': 'V2X_01_100ms',
                'srcPort': 50026.0,
                'destPort': 51915.0,
                'messageID': '0x0000036A'
            }
        ],
        'ConnectionType': 'eth',
        'ECUID': '0x6B',
        'srcIP': '10.0.0.32',
        'ECUName': 'V2X'
    }
  ];

  public static POST_OEM_TOPO = [
    {
        'srcMAC': '02:00:00:00:02:00',
        'Messages': [
            {
                'signals': [
                    {
                        'CANID': 'HS-CAN',
                        'Receivers': '',
                        'destMAC': '01:00:5E:00:01:F0',
                        'signalID': '0x00041100',
                        'destIP': '239.0.1.240',
                        'signalaName': 'DoorLock_AsstDrKeyLkSwSta'
                    },
                    {
                        'CANID': 'HS-CAN',
                        'Receivers': '',
                        'destMAC': '01:00:5E:00:01:F0',
                        'signalID': '0x00041101',
                        'destIP': '239.0.1.240',
                        'signalName': 'DoorLock_AsstDrKeyUnLkSwSta'
                    }
                ],
                'messageName': 'ICU_02_200ms',
                'srcPort': 50193.0,
                'destPort': 51915.0,
                'messageID': '0x00000411'
            }
        ],
        'ConnectionType': 'eth',
        'ECUID': '0x16',
        'srcIP': '10.0.2.0',
        'ECUName': 'ICU'
    },
    {
        'srcMAC': '02:00:00:00:00:80',
        'Messages': [
            {
                'signals': [
                    {
                        'CANID': 'CAN-FD',
                        'Receivers': '',
                        'destMAC': '01:00:5E:00:03:70',
                        'signalID': 23,
                        'destIP': '239.0.3.112',
                        'signalName': 'CLU_Crc1Val'
                    },
                    {
                        'CANID': 'CAN-FD',
                        'Receivers': 'ICU,ADAS_PRK',
                        'destMAC': '01:00:5E:00:03:70',
                        'signalID': 23,
                        'destIP': '239.0.3.112',
                        'signalName': 'CLU_AlvCnt1Val'
                    }
                ],
                'messageName': 'CLU_01_20ms',
                'srcPort': 49578.0,
                'destPort': 51915.0,
                'messageID': '0x000001AA'
            }
        ],
        'ConnectionType': 'eth',
        'ECUID': '0x04',
        'srcIP': '10.0.0.128',
        'ECUName': 'CLU'
    },
    {
        'srcMAC': '02:00:00:00:00:40',
        'Messages': [
            {
                'signals': [
                    {
                        'CANID': 'CAN-FD',
                        'Receivers': 'CLU',
                        'destMAC': '02:00:00:00:00:80',
                        'signalID': 23,
                        'destIP': '10.0.0.128',
                        'signalName': 'HUD_BrgtnsSta'
                    },
                    {
                        'CANID': 'CAN-FD',
                        'Receivers': 'CLU',
                        'destMAC': '02:00:00:00:00:80',
                        'signalID': 23,
                        'destIP': '10.0.0.128',
                        'signalName': 'HUD_RotatSta'
                    }
                ],
                'messageName': 'HUD_01_100ms',
                'srcPort': 49818.0,
                'destPort': 51914.0,
                'messageID': '0x0000029A'
            }
        ],
        'ConnectionType': 'eth',
        'ECUID': '0x14',
        'srcIP': '10.0.0.64',
        'ECUName': 'HUD'
    }
  ];

  public static POST_OEM_ADDR = '0x32c206E3c36aE576AB394F17e4fD72086685bF3b';
  public static ADDRESS = '0x0D8A6d4978aC90d0c4699123B449F1E8F3941E1c';
}
