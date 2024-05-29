using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Monaverse;
using Monaverse.Core;
using UnityEngine.SceneManagement;
using WalletConnectUnity.Core;
using WebSocketSharp;

public class WalletConnect : MonoBehaviour
{
    public static WalletConnect Instance { get; private set; }

    private WebSocket _webSocketConnection;
    private string _wallet;

    void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }

    void Start()
    {
        Invoke("Connect", 1f);
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    async void Connect()
    {
        Debug.Log("Connecting to Mona server...");
        _wallet = await MonaverseManager.Instance.SDK.ConnectWallet();
        Debug.Log("Connected to Mona server. Wallet: " + _wallet);

        _webSocketConnection = new WebSocket("ws://localhost:3100");
        _webSocketConnection.Connect();

        Debug.Log("Ws connection opened:");

        SceneManager.LoadScene("AmazingTrack");

    }

    public void SendMessage(int score)
    {
        var payload = new Payload{
            user = _wallet,
            score = score
        };

        string message = _wallet + ":" + score;
        _webSocketConnection.Send(message);
    }
}

public class Payload
{
    public string user { get; set; }
    public int score { get; set; }
}