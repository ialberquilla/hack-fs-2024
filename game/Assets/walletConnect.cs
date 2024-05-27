using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Monaverse;
using Monaverse.Core;
using UnityEngine.SceneManagement;

public class walletConnect : MonoBehaviour
{
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
        string wallet = await MonaverseManager.Instance.SDK.ConnectWallet();
        Debug.Log("Connected to Mona server. Wallet: " + wallet);
        SceneManager.LoadScene("AmazingTrack");
    }
}
