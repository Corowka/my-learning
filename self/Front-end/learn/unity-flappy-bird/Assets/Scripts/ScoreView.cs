using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEditor.Search;
using UnityEngine;

public class ScoreView : MonoBehaviour
{
    [SerializeField] CanvasGroup _canvasGroup;
    [SerializeField] private ScoreCounter _scoreCounter;
    [SerializeField] private TMP_Text _score;

    private void OnEnable()
    {
        _scoreCounter.ScoreChanged += OnScoreChanged;
    }

    private void OnDisable()
    {
        _scoreCounter.ScoreChanged -= OnScoreChanged;
    }

    private void OnScoreChanged(int score)
    {
        if (score == 0)
        {
            Hide();
        } else
        {
            Show();
        }
        _score.text = score.ToString();
    }

    public void Show()
    {
        _canvasGroup.alpha = 1.0f;
    }

    public void Hide()
    {
        _canvasGroup.alpha = 0f;
    }
}
