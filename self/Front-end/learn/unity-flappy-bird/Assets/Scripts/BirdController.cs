using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(Rigidbody2D))]
public class BirdController : MonoBehaviour
{
    [SerializeField] private float _tapForce;
    [SerializeField] private float _speed;
    [SerializeField] private float _rotateSpeed;
    [SerializeField] private float _minRotationZ;
    [SerializeField] private float _maxRotationZ;

    private Vector2 _startPosition;
    private Rigidbody2D _rigidBody2D;
    private Quaternion _minRotation;
    private Quaternion _maxRotation;

    void Start()
    {
        _startPosition = transform.position;
        _rigidBody2D = GetComponent<Rigidbody2D>();

        _minRotation = Quaternion.Euler(0, 0, _minRotationZ);
        _maxRotation = Quaternion.Euler(0, 0, _maxRotationZ);
    }
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            _rigidBody2D.velocity = new Vector2(_speed, _tapForce);
            transform.rotation = _maxRotation;
        }

        transform.rotation = Quaternion.Lerp(transform.rotation, _minRotation, _rotateSpeed * Time.deltaTime);
    }

    public void Reset()
    {
        _rigidBody2D.velocity = new Vector2(0, 0);
        transform.position = _startPosition;
        transform.rotation = Quaternion.Euler(0, 0, 0);
    }
}
