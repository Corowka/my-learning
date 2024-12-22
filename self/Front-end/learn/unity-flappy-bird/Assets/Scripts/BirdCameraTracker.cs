using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BirdCameraTracker : MonoBehaviour
{
    [SerializeField] private GameObject _bird;
    [SerializeField] private float _offsetX;

    void Update()
    {
        Vector3 position = transform.position;
        position.x = _bird.transform.position.x + _offsetX;
        transform.position = position;
    }
}
